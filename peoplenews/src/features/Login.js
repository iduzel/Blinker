import React, { useContext, useState } from "react";
import { Button, Form, FormText } from "react-bootstrap";
import "./features.scss";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../components/context";

const Login = () => {
  const { setUserData,  setShowClass, setUsername } = useContext(UserContext);  

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
      setShowClass('show')
      setUsername(data.username || data.email)
      
    }
  };
  return (
    <div className="login container">
      <Form onSubmit={(e) => handleLogin(e)}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            type="text"
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={data.pass}
            onChange={(e) => setData({ ...data, pass: e.target.value })}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <Link  to="/forgotpass">Forgot pass</Link>
      <Form.Group>
        <FormText>
           Don't you have an account? No Problem. 
           <small onClick={() => navigate('/register')} className="small text-primary fs-5 ">Register</small> 
        </FormText>
        
       </Form.Group>
    </div>
  );
};

export default Login;
