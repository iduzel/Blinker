import React, { useContext } from "react";
import { Button, Col, Nav, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./context";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);

  const handleLogout = () => {
    // clear the context
    setUserData(null);
    // redirect user to home
    navigate("/");
  };
  return (
    <div className="bg-danger fs-1 fw-bold">
      <Row>
        <Col className="col-11">
          <Nav className="container d-flex ">
            <Link className="navbar-link" to="/register">
              REGISTER
            </Link>
            <Link className="navbar-link ms-5 me-5" to="/">
              LOGIN
            </Link>
            <Link className="navbar-link" to="/home">
              HOME
            </Link>
          </Nav>
        </Col>
        <Col className="col-1">
        <p>
        <Button onClick={handleLogout}>Logout</Button>
      </p>
        </Col>
      </Row>
    </div>
  );
};

export default Navbar;
