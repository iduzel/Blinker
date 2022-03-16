import { Col, Row } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
import Profile from "./components/Profile";
import Home from "./features/Home";
import Login from "./features/Login";
import Register from "./features/Register";
import Unknown from "./features/Unknown";

function App() {
  return (
    <div className="App ">
      <Row className="mt-1">
        <Navbar />
      </Row>
      <Row className="main-row ">
        <Col className="col-3 "></Col>
        <Col className="col-6 main-col  p-5 border border-1 rounded shadow-lg  d-flex justify-content-center">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Unknown />} />
          </Routes>
        </Col>
        <Col className="col-3"></Col>
      </Row>
      <Row><Footer /></Row>
    </div>
  );
}

export default App