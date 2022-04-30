import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import Image from 'react-bootstrap/Image'
import {Col, Row, Spinner} from "react-bootstrap";

function UserInfo() {
    const [userInfo, setUserInfo] = useState();
    const [error, setError] = useState();
    const [searchParams] = useSearchParams();

    console.log(searchParams.get('code'));

    useEffect(() => {
        fetch(`http://127.0.0.1:8080/githubUser/getInfo?code=${searchParams.get('code')}`)
            .then(response => response.json())
            .then(data => setUserInfo(data))
            .catch(error => setError(error))
    }, []);

    /*if (error) {
        return (
            <Alert variant="danger">
                {error.message}
            </Alert>
        );
    }*/

    if (!userInfo) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading user data</span>
            </Spinner>
        );
    }

    console.log(userInfo);

    return (
        <>
            <div className="user-header">
                <Row>
                    <Col xs={2}>
                        <Image src={userInfo.avatar_url} alt={userInfo.name} height={128} width={128} roundedCircle/>
                    </Col>
                    <Col>
                        <h2>{userInfo.name}</h2>
                        {
                            userInfo.location && <>📍 {userInfo.location}</>
                        }
                        <br/>
                        👨‍💻 JavaScript, Java, React
                    </Col>
                </Row>
            </div>
            <hr/>
        </>
    );
}

export default UserInfo;