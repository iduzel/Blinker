import React from "react";
import { Button, Form } from "react-bootstrap";
import "./features.scss";

const Login = () => {
  return (
    <div className="login container">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email/Username</Form.Label>
          <Form.Control type="email" placeholder="Enter email/username" />
          
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
