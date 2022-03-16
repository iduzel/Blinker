import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormText,
  Image,
  Row,
} from "react-bootstrap";
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
      <Row>
        <Col>
          <Image
            className="h-75 w-100 rounded"
            fluid
            src="https://images.unsplash.com/photo-1570563568161-e4f5e8c6e27f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cmVwb3J0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
          />
        </Col>
        <Col>
          {" "}
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-4">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder=" Enter a username"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder=" Enter email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder=" Password"
                value={data.pass}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-4 ">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="  Confirm Password" />
            </Form.Group>

            <Button
              className="color register-button fs-5 fw-bold border-2 "
              variant=""
              type="submit"
            >
              Register
            </Button>
          </Form>
          <Form.Group className="mt-5 container">
            <FormText>
              Already have an account!{" "}
              <small>
                <Link to="/">Login</Link>
              </small>
            </FormText>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
