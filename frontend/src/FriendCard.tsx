import React from 'react';
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";

function FriendCard({friend}) {
    return (
        <Card style={{width: '8rem', padding: 0}}>
            <Card.Img variant="top" src={friend.avatar_url}/>
            <Card.Body>
                <Card.Title>{friend.login}</Card.Title>
                <Link to="#">See profile</Link>
            </Card.Body>
        </Card>
    );
}

export default FriendCard;