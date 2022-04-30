import React from 'react';
import {Button} from 'react-bootstrap';
import {AiFillGithub} from "react-icons/ai";

// Form for signing in to github
export default function GitForm() {
    const authenticateUrl = 'http://127.0.0.1:8080/githubUser/authenticate';

  return (
    <>
    {/* use if we will need to input mail
      <Form>
        <FaGithub/>
        <Form.Group className="mb-3" controlId="formGit">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />

          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
 
      </Form> */}

      {/* call github sign in api */}
        <Button variant="outline-dark" onClick={() => window.location.href = authenticateUrl}>
            <AiFillGithub/> Sign in with GitHub
      </Button>
    </>
  )
}
