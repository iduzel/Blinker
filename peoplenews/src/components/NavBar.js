import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <Nav className='container d-flex '>
            <Link to="/register">REGISTER</Link>
            <Link className='ms-2 me-2' to="/login">LOGIN</Link>
            <Link to="/home">HOME</Link> 
        </Nav>
    </div>
  )
}

export default Navbar