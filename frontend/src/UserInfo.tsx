import React from 'react';
import {useParams} from "react-router-dom";

function UserInfo() {
    let {username} = useParams();

    return (
        <>
            Hello {username}
        </>
    );
}

export default UserInfo;