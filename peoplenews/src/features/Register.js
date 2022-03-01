import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import './features.scss'

const Register = () => {
  return (
    <div className='container register'>
      <Container >
      <Form>

      <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="email" placeholder="Enter a username" />
          <Form.Text className="text-muted">
            
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
           
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
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