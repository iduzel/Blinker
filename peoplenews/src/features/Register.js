import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap'
import './features.scss'
import axios from 'axios'; 


const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    pass: "",
  });

  const handleSubmit = async ()=> {
    console.log("data is", data);
    if (!data.pass || !data.username || !data.email) return;
    const response = await axios.post("/users/register", data);

    console.log("response is ", response);
  }
  return (
    <div className='container register'>
      <Container >
      <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter a username"
           value={data.username}
           onChange={(e) => setData({ ...data, username: e.target.value })}
          /> 
          <Form.Text className="text-muted">
            
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" 
             value={data.email}
             onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <Form.Text className="text-muted">
           
          </Form.Text>
        </Form.Group>  

        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" 
           value={data.pass}
           onChange={(e) => setData({ ...data, pass: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button className='text-danger fs-5 fw-bold border-2 bg-info' variant="outline-danger" type="submit" >
          Register
        </Button>
      </Form>
     
    </Container>

    </div>
  )
}

export default Register