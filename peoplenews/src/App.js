import { Col, Row } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import "./App.css";
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
      <Row className="main-row">
        <Col className="shadow-lg"></Col>
        <Col className="main-col  p-5 border border-1 rounded">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Unknown />} />
          </Routes>
        </Col>
        <Col className="shadow-lg"></Col>
      </Row>
    </div>
  );
}

export default App