import React, { useContext, useState } from "react";
import { Button, Col, Form, FormText, Image, Row } from "react-bootstrap";
import "./features.scss";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../components/context";


const Login = () => {
  const { setUserData, setShowClass, setUsername, userId, setUserId } =
    useContext(UserContext);

  const [data, setData] = useState({
    username: "",
    email: "",
    pass: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("data is", data);
    if (!data.pass) return;

    const response = await axios.post("/users/login", data);

    console.log("response is ", response);

    if (response.data.success) {
      // user logged in successfully, update context and redirect user to home

      setUserData({ ...response.data.user });
      navigate("/home");
      setShowClass("show");
      setUsername(response.data.user.username);
      setUserId(response.data.user._id);
      console.log("ID is :", response.data.user._id);
    }
  };
  return (
    <div className="login container ">
      <Row>
        <Col>
        <Image className="rounded"  fluid src="https://images.unsplash.com/photo-1557428894-56bcc97113fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fG5ld3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"/>
        </Col>
        <Col> 
         <Form onSubmit={(e) => handleLogin(e)}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          
          <Form.Control
           className="form-control"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            type="text"           
            placeholder="&#61447;  Enter username"
            
          />
        
           
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
          className="form-control"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            type="email"
            placeholder=" Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
          className="form-control"
            value={data.pass}
            onChange={(e) => setData({ ...data, pass: e.target.value })}
            type="password"
            placeholder="&#61475; Password"
          />
        </Form.Group>

        <Button className="login-button mt-4" type="submit">
          Login
        </Button>
      </Form>
      <Link to="/forgotpass">Forgot pass</Link>
      
        </Col>
      </Row>
      <Form.Group className="text-center mt-2">
        <FormText>
          Don't you have an account? No Problem.
          <small
            onClick={() => navigate("/register")}
            className="small text-primary fs-5 "
          >
            Register
          </small>
        </FormText>
      </Form.Group>
     
    
  
    </div>
  );
};

export default Login;
