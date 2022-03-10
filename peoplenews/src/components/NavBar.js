import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-danger fs-1 fw-bold'>
        <Nav className='container d-flex '>
            <Link className='navbar-link' to="/register">REGISTER</Link>
            <Link className='navbar-link ms-5 me-5' to="/login">LOGIN</Link>
            <Link  className='navbar-link' to="/">HOME</Link> 
        </Nav>
    </div>
  )
}

export default Navbar