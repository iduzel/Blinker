import React, { useContext } from "react";
import { Button, Col, Nav, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context";
import logo from "../components/pictures/5.jpg";
import '../features/features.scss'

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, setUserData, showClass, setShowClass } =
    useContext(UserContext);

  const handleLogout = () => {
    // clear the context
    setUserData(null);
    // redirect user to home
    navigate("/");
    setShowClass("hide");
  };
  return (
    <div className="navbar-logo fs-1 fw-bold mt-5 shadow-lg">
      <Row>
        <Col className="col-11">
          <Nav className="container d-flex ">
            <img className="logo" src={logo} alt="logo" />
          </Nav>
        </Col>
        <Col className="col-1">
          <Button className={showClass} onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Navbar;
