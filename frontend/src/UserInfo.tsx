import React, {useEffect, useState} from 'react';
import './UserInfo.css';
import {useSearchParams} from "react-router-dom";
import Image from 'react-bootstrap/Image'
import {Accordion, Badge, Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";
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
                const githubSignUpDate = new Date(data.created_at);
                const yearsOfExperience = new Date().getFullYear() - githubSignUpDate.getFullYear();
                const langs = Object.entries(data.repoLanguages).sort((a, b) => b[1] - a[1]).slice(0, 6).map(e => e[0]);
                fetchOffers(
                    data,
                    langs,
                    data.bio,
                    0,
                    data.location,
                    yearsOfExperience
                );
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

    function fetchOffers(userInfo, langs, bio, minSalary, city, yoe) {
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
                city: city,
                yoe: yoe
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

            <div class="d-flex justify-content-center">
                <div class="spinner-border m-5" style={{width: "3rem", height: "3rem"}}>
                </div>
          </div>
        );
    }

    const langs = Object.entries(userInfo.repoLanguages).sort((a, b) => b[1] - a[1]).slice(0, 6).map(e => e[0]);

    const githubSignUpDate = new Date(userInfo.created_at);
    const yearsOfExperience = new Date().getFullYear() - githubSignUpDate.getFullYear();

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
                        {userInfo.extractedKeywords.roles.length > 0 && (
                            <>
                                💼 {userInfo.extractedKeywords.roles.map((keyword, key) =>
                                <Badge
                                    bg="secondary"
                                    key={key}
                                >{keyword}</Badge>
                            )}
                                <br/>
                            </>
                        )
                        }
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
                fetchOffers(
                    userInfo,
                    event.target[3].value.split(','),
                    userInfo.bio,
                    event.target[1].value,
                    event.target[0].value,
                    event.target[2].value
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
                            <Form.Label>Years of experience</Form.Label>
                            <Form.Control type="number" defaultValue={yearsOfExperience}/>
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

            <Accordion defaultActiveKey={['0','1']} alwaysOpen>
            <Accordion.Item eventKey="0">
            <Accordion.Header><h3>Recommended job offers</h3></Accordion.Header>
            <Accordion.Body><div className="container">
                <div className="row" >
                    {offers.map((offer, key) => (
                        <div key={key} className="col-md mt-3"><Offer offerInfo={offer}/></div>
                ))}
                </div>
            </div>
            <hr/>
            </Accordion.Body>

            </Accordion.Item>
            <Accordion.Item eventKey="1">
            <Accordion.Header>
                <h3>Friends</h3></Accordion.Header>
                <Accordion.Body>
            <Container>
                <Row className="justify-content-md-start">
                    {
                        userInfo.friends.map(friend => <FriendCard key={friend.id} friend={friend}/> )
                    }
                </Row>
            </Container>
            </Accordion.Body>
            </Accordion.Item>
            </Accordion>
            
        </>
    );
}

export default UserInfo;