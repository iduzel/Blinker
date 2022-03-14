import React, { useContext, useState } from "react";
import { Button, Col, Nav, OverlayTrigger, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context";
import logo from "../components/pictures/5.jpg";
import "../features/features.scss";

const Navbar = () => {
  const [logoutClass, setLogoutClass] = useState("hide");
  const navigate = useNavigate();
  const { userData, setUserData, showClass, setShowClass, username } =
    useContext(UserContext);

  const handleLogout = () => {
    // clear the context
    setUserData(null);
    // redirect user to home
    navigate("/");
    setShowClass("hide");
  };

  const handleUsernameLogout = () => {
    setLogoutClass("show");
  };
  return (
    <div className="navbar-logo fs-1 fw-bold mt-5 shadow-lg">
      <Row>
        <Col className="col-10">
          <Nav className="container d-flex ">
            <img className="logo" src={logo} alt="logo" />
          </Nav>
        </Col>

        <Col
          onMouseLeave={() => setLogoutClass("hide")}
          className="col-2  d-flex flex-column justify-content-center align-items-center "
        >
          <h2
            style={{ color: "#61B7DE" }}
            onMouseOver={() => setLogoutClass("show")}
            className={`${showClass} demo`}
          >
            {username}{" "}
          </h2>
          <Button
            onMouseLeave={() => setLogoutClass("hide")}
            className={logoutClass}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Navbar;
