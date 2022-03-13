import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/context";
import Blink from "./Blink";
import CardBlinkDemo from "../components/CardBlinkDemo";
import { Col, Row } from "react-bootstrap";
import img1 from "../components/pictures/1.jpg";
import MyTextarea from "../components/TextArea";

const Home = () => {
  const navigate = useNavigate();

  const { userData, setUserData } = useContext(UserContext);

  // States
  const [newBlink, setNewBlink] = useState("");
  const [blinks, setBlinks] = useState([]);


  console.log("New blink is: ", newBlink);

  // LIST
  // get data from db an dput it into our array state (posts)
  useEffect(() => {
    if (!userData) navigate("/"); // check if user is logged in and if not redirect him to login page

    const getData = async () => {
      const response = await axios.get("/blinks/list");

      console.log("home loading: response is", response);
      let temp = [...response.data];
      temp.reverse();

      setBlinks(temp);
    };

    getData();
  }, []);

  console.log("blinks are: ", blinks);

  // ADD BLINK
  const handleSave = async () => {
    console.log("saved");

    const data = {
      owner: userData._id,
      text: newBlink,
    };

    console.log("Home: handleSave: data is", data);
    const response = await axios.post("/blinks/add", data);

    console.log("save post: response is", response);

    if (response.data.success) setBlinks([response.data.blink, ...blinks]);
    setNewBlink("");
  };

  return (
    <div className="home border border-1  container d-flex flex-column align-items-center ">
      <div className="border border-1 w-100 blink container d-flex flex-column align-items-center ">
        <Row className=" d-flex justify-content-between  w-100">
          <Col>
            <h2 className="fw-bold">Home</h2>
          </Col>
          <Col className="">
            <p className="fs-1 text-end">...</p>
          </Col>
        </Row>
        <Row className="mt-2 d-flex justify-content-between  w-100">
          <Col className="col-2">
            <img className="blink-user-img" src={img1} alt="user-img" />
          </Col>
          <Col className="col-10">
            <MyTextarea setData={setNewBlink} />
          </Col>
        </Row>
        <Row className="w-100">
          <Col className="col-12 text-end">
            <button
              className="m-2 btn btn-primary w-25 fs-4 text-dark text-center rounded-pill"
              onClick={handleSave}
            >
              Blink
            </button>
          </Col>
        </Row>
      </div>

      <h1 className="text-primary fs-2 mt-3">150 BLINKS</h1>

      {blinks?.map((item, index) => (
        <CardBlinkDemo
          key={index}
          item={item}
          blinks={blinks}
          setBlinks={setBlinks}
        />
      ))}
    </div>
  );
};

export default Home;
