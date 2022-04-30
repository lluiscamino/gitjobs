import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { FaGithub  } from "react-icons/fa";

// Form for signing in to github
export default function GitForm() {
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
      <Button variant="primary" onClick={() => "http://127.0.0.1:8080/sign-in-github"}>
        Log in with GitHub
      </Button>
    </>
  )
}
