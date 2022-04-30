import React, {useEffect, useState} from 'react';
import './UserInfo.css';
import {useSearchParams} from "react-router-dom";
import Image from 'react-bootstrap/Image'
import {Button, Col, Form, Row, Spinner} from "react-bootstrap";
import Offer from "./Offer";

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

    const githubSignUpDate = new Date(userInfo.created_at);
    const yearsOfExperience = new Date().getFullYear() - githubSignUpDate.getFullYear();

    console.log(userInfo);

    return (
        <>
            <div className="user-header">
                <Row>
                    <Col xs="auto">
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
            <Form>
                <h3>Search parameters</h3>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text"/>
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
                            <Form.Control type="text"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label></Form.Label>
                            <Button variant="primary">Search</Button>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <hr/>
            <h3>Colleagues</h3>
            <hr/>
            <h3>Recommended job offers</h3>
            <Offer offerInfo={
                {
                    id: "e62fbc45824472b2a94dd849d963ed",
                    title: "Persona con conocimientos altos en SEO On Page y Off Page",
                    province: {
                        id: 33,
                        value: "Madrid"
                    },
                    city: "Boadilla del Monte",
                    link: "https://www.infojobs.net/boadilla-del-monte/persona-con-conocimientos-altos-seo-on-page-off-page/of-ie62fbc45824472b2a94dd849d963ed",
                    category: {
                        id: 110,
                        value: "Marketing y comunicación"
                    },
                    contractType: {
                        id: 1,
                        value: "Indefinido"
                    },
                    subcategory: {
                        id: 3072,
                        value: "Publicidad"
                    },
                    salaryMin: {
                        id: 255,
                        value: "15.000 €"
                    },
                    salaryMax: {
                        id: 265,
                        value: "21.000 €"
                    },
                    salaryPeriod: {
                        id: 3,
                        value: "Bruto/año"
                    },
                    experienceMin: {
                        id: 2,
                        value: "Al menos 1 año"
                    },
                    workDay: {
                        id: 1,
                        value: "Completa"
                    },
                    study: {
                        id: 50,
                        value: "Bachillerato"
                    },
                    published: "2022-04-30T10:18:27.000Z",
                    updated: "2022-04-30T10:18:27.000Z",
                    author: {
                        id: "3b5a2e5be44c48af876199afa49759",
                        name: "Atrium Salud",
                        uri: "https://www.infojobs.net/atrium-salud/em-i3b5a2e5be44c48af876199afa49759",
                        logoUrl: "https://multimedia.infojobs.net/api/v1/tenants/c7e2b9c1-8480-43b0-ad9e-000c17aa2cbb/domains/718302b6-5343-43d3-a8a3-829dc3da0893/buckets/6f3ab1cc-5920-4f4e-b131-46a4587a0e1f/images/82/82fa791b-0a76-485a-b781-49027273981f?jwt=eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2Mjk3MDkwODUsImV4cCI6MTgwMTU1NzkwMCwicnFzIjoiR0VUXFwvdGVuYW50cy9jN2UyYjljMS04NDgwLTQzYjAtYWQ5ZS0wMDBjMTdhYTJjYmIvZG9tYWlucy83MTgzMDJiNi01MzQzLTQzZDMtYThhMy04MjlkYzNkYTA4OTMvYnVja2V0cy82ZjNhYjFjYy01OTIwLTRmNGUtYjEzMS00NmE0NTg3YTBlMWYvaW1hZ2VzLzgyLzgyZmE3OTFiLTBhNzYtNDg1YS1iNzgxLTQ5MDI3MjczOTgxZiIsIm1ldGFkYXRhIjp7InJ1bGUiOnsidmVyc2lvbiI6IjIwMTYtMTAiLCJhY3Rpb25zIjpbXX19fQ.LGdelxlEsmdy7RMlBWfcdZMUEyJOb5Kydp7lsDc8m1CQP2GyKb6n7tIB-EObnXJKURR8SAmRrcj_1Ln4nRL0IZtIAL5O1W9_PV93F-yz3U50TRrjXKVDdO0reMWvjXbo2C_RsGzKXwFyhNqHdt2lQgSzoDQD0vANPsvqDkaZHr9jdJ49FLCLFfDs7zyFk3CvDGkZEDOybSNX1vOM1xu4elCXIbctrmK0XqlDBMtm3SwEDptxschIkSdpYsbVnIld6qgwpx4cqomh0UXDTbLWg_Gozn4xZyG9aEGPIWjEufGXScY7wkYoNimuYCBvENrFVPScnsl79BAQvgq1zhVhXw&AccessKeyId=d724d9a53d95a810",
                        corporateResponsive: false,
                        showCorporativeHeader: false
                    },
                    requirementMin: "Debes saber manejar herramientas como: Google Search Console, Google Analytics 4, Ahrefs, SE Ranking, SEMRush, Sistrix, Keyword Planner, Screaming Frog, Wordpress/Woocommerce, etc. Necesitamos que tengas buenas dotes de redacción y conocimientos reales y demostrables en anteriores proyectos.",
                    bold: false,
                    applications: "0",
                    subSegment: 23,
                    executive: false,
                    salaryDescription: "15.000€ - 21.000€ Bruto/año",
                    urgent: false,
                    color: false
                }
            }/>
        </>
    );
}

export default UserInfo;