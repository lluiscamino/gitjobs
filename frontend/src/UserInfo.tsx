import React, {useEffect, useState} from 'react';
import './UserInfo.css';
import {useSearchParams} from "react-router-dom";
import Image from 'react-bootstrap/Image'
import {Badge, Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import Offer from "./Offer";
import getColor from 'github-lang-colors';
import FriendCard from "./FriendCard";

function UserInfo() {
    const [userInfo, setUserInfo] = useState();
    const [offers, setOffers] = useState([]);
    const [error, setError] = useState();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        fetch(`http://127.0.0.1:8080/githubUser/getInfo?code=${searchParams.get('code')}`)
            .then(response => response.json())
            .then((data) => {
                setUserInfo(data);
                const langs = Object.entries(data.repoLanguages).sort((a, b) => b[1] - a[1]).slice(0, 6).map(e => e[0]);
                fetchOffers(
                    data,
                    langs,
                    data.bio,
                    0,
                    data.location
                );
                fetch('http://127.0.0.1:8080/infoJobs/getOffers', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userInfo: JSON.stringify(data),
                        langs: langs.join(',').replace(/\s/g, '%20'),
                        bio: data.bio,
                        minSalary: 0,
                        city: data.location
                    })
                })
                    .then(response => response.json())
                    .then(data => setOffers(data.slice(0, 27)))
                    .catch(error => setError(error))
            })
            .catch(error => setError(error));
    }, []);

    /*if (error) {
        return (
            <Alert variant="danger">
                {error.message}
            </Alert>
        );
    }*/

    function fetchOffers(userInfo, langs, bio, minSalary, city) {
        fetch('http://127.0.0.1:8080/infoJobs/getOffers', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userInfo: JSON.stringify(userInfo),
                langs: langs.join(',').replace(/\s/g, '%20'),
                bio: bio,
                minSalary: minSalary,
                city: city
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setOffers(data.slice(0, 27));
            })
            .catch(error => setError(error))
    }

    if (!userInfo) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading user data</span>
            </Spinner>
        );
    }

    const langs = Object.entries(userInfo.repoLanguages).sort((a, b) => b[1] - a[1]).slice(0, 6).map(e => e[0]);

    const githubSignUpDate = new Date(userInfo.created_at);

    return (
        <>
            <div className="user-header">
                <Row>
                    <Col xs="auto">
                        <Image src={userInfo.avatar_url} alt={userInfo.name} height={128} width={128} roundedCircle />
                    </Col>
                    <Col>
                        <h2>{userInfo.name}</h2>
                        {
                            userInfo.location && <>📍 {userInfo.location}</>
                        }
                        <br />
                        👨‍💻 {langs.map((entry, key) => {
                            return (
                                <Badge
                                    ref={node => {
                                        if (node) {
                                            node.style.setProperty('background-color', getColor(entry), "important");
                                        }
                                    }}
                                    className="prog-lang-badge"
                                    key={key}
                                >{entry}</Badge>
                            )
                        })}
                    </Col>
                </Row>
            </div>
            <hr />
            <Form onSubmit={event => {
                event.preventDefault();
                console.log(event.target[1].value);
                fetchOffers(
                    userInfo,
                    event.target[2].value.split(','),
                    userInfo.bio,
                    event.target[1].value,
                    event.target[0].value
                );
            }}>
                <h3>Search parameters</h3>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" defaultValue={userInfo.location}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Minimum salary (yearly)</Form.Label>
                            <Form.Control type="number" defaultValue={0}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Technical skills</Form.Label>
                            <Form.Control type="text" defaultValue={langs.join(',')}/>
                        </Form.Group>
                    </Col>
                </Row>
                <div style={{textAlign: 'center', marginTop: 5}}>
                    <Button type="submit" variant="primary">Search</Button>
                </div>
            </Form>
            <hr />
            <h3>Recommended job offers</h3>
            <div className="container">
                <div className="row" >
                    {offers.map((offer, key) => (
                        <div key={key} className="col-md-4 mt-3 mt-3"><Offer offerInfo={offer}/></div>
                ))}
                </div>
            </div>
            <hr/>
            <h3>Friends</h3>
            <Container>
                <Row>
                    {
                        userInfo.friends.map(friend => <FriendCard key={friend.id} friend={friend}/>)
                    }
                </Row>
            </Container>
        </>
    );
}

export default UserInfo;