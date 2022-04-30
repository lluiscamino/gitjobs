import React, {useEffect} from 'react';
import {useSearchParams} from "react-router-dom";

function GitHubRedirect() {
    const [searchParams] = useSearchParams();

    console.log(searchParams.get('code'));

    useEffect(() => {
        fetch(`http://127.0.0.1:8080/githubUser/getInfo?code=${searchParams.get('code')}`)
            .then(response => response.json())
            .then(data => console.log(data));
    }, []);

    return (<></>);
}

export default GitHubRedirect;