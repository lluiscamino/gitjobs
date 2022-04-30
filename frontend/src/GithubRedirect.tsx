import React from 'react';
import {useSearchParams} from "react-router-dom";

function GitHubRedirect() {
    const [searchParams] = useSearchParams();

    console.log(searchParams);

    return (<></>);
}

export default GitHubRedirect;