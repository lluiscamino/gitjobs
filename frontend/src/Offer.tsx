import React from 'react';
import './Offer.css';
import {Button, Card, Image} from "react-bootstrap";

function Offer({offerInfo}) {
    return (
        <Card style={{width: '20rem'}}>
            <Card.Body>
                <Card.Title>{offerInfo.title}</Card.Title>
                <a href={offerInfo.author.uri}>
                    <Card.Subtitle className="mb-2 text-muted">
                        {
                            offerInfo.author.logoUrl &&
                            <Image src={offerInfo.author.logoUrl} height={36} className="company-logo"/>
                        }
                        {offerInfo.author.name}
                    </Card.Subtitle>
                </a>
                <Card.Text>
                    {offerInfo.requirementMin.substring(0, 140)}...
                    <div>
                        📍 {offerInfo.city} | {offerInfo.experienceMin.value}
                    </div>
                </Card.Text>
                <Button variant="primary">Apply</Button> <Button variant="secondary">More info</Button>
            </Card.Body>
        </Card>
    );
}

export default Offer;