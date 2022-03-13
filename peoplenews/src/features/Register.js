import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormText } from "react-bootstrap";
import "./features.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data is", data);
    if (!data.password || !data.username || !data.email) return;
    const response = await axios.post("/users/register", data);

    console.log("response is ", response);
    navigate("/");
  };
  return (
    <div className="container register">
      <Container>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-4">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a username"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={data.pass}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" />
          </Form.Group>

          <Button
            className="text-danger fs-5 fw-bold border-2 bg-info"
            variant="outline-danger"
            type="submit"
          >
            Register
          </Button>
        </Form>
      </Container>

      <Form.Group className="mt-3 container">
        <FormText>Already have an account! <small><Link to='/'>Login</Link></small></FormText>
      </Form.Group>
    </div>
  );
};

export default Register;
