import React, {useState} from 'react';
import {Button, Card, Image, Modal} from "react-bootstrap";

function Offer({offerInfo}) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Card style={{width: "20em", height:"25em"}}>
                <Modal show={modalOpen} onClick={() => setModalOpen(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {offerInfo.title} |
                            {
                                offerInfo.author.logoUrl &&
                                <Image alt={offerInfo.author.name} src={offerInfo.author.logoUrl} height={36}
                                       className="company-logo"/>
                            } {offerInfo.author.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Job details</h4>
                        <div>
                            📍 <strong>Location</strong>: {offerInfo.city}<br/>
                            📚 <strong>Min. experience</strong>: {offerInfo.experienceMin.value}<br/>
                            ⌛ <strong>Contact type</strong>: {offerInfo.contractType.value}<br/>
                            📅 <strong>Work day</strong>: {offerInfo.workDay.value}<br/>
                            💰 <strong>Salary</strong>: {offerInfo.salaryDescription}
                        </div>

                        <h4>Minimum requirements</h4>
                        {offerInfo.requirementMin}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setModalOpen(false)}>
                            Close
                        </Button>
                        <a href={offerInfo.link} target="_blank" rel="noreferrer">
                            <Button variant="primary">Apply</Button>
                        </a>
                    </Modal.Footer>
                </Modal>
                <Card.Body>
                    <Card.Title>{offerInfo.title}</Card.Title>
                    <a href={offerInfo.author.uri}>
                        <Card.Subtitle className="mb-2 text-muted">
                            {
                                offerInfo.author.logoUrl &&
                                <Image alt={offerInfo.author.name} src={offerInfo.author.logoUrl} height={36}
                                       className="company-logo"/>
                            }
                            {offerInfo.author.name}
                        </Card.Subtitle>
                    </a>
                    <Card.Text>
                        {offerInfo.requirementMin.substring(0, 140)}...
                        <hr/>
                        <div>
                            📍 {offerInfo.city}<br/>
                            📚 {offerInfo.experienceMin.value}<br/>
                            💰 {offerInfo.salaryDescription}
                        </div>
                    </Card.Text>
                    <a href={offerInfo.link} target="_blank" rel="noreferrer">
                        <Button variant="primary">Apply</Button>
                    </a> <Button variant="secondary" onClick={() => setModalOpen(true)}>More info</Button>
                </Card.Body>
            </Card>
        </>
    );
}

export default Offer;