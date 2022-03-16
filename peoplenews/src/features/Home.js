import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/context";
import Blink from "./Blink";
import CardBlinkDemo from "../components/CardBlinkDemo";
import { Col, Row } from "react-bootstrap";
import img1 from "../components/pictures/5.jpg";
import MyTextarea from "../components/TextArea";

const Home = () => {
  const navigate = useNavigate();

  const { userData, setUserData } = useContext(UserContext);

  // States
  const [newBlink, setNewBlink] = useState("");
  const [blinks, setBlinks] = useState([]);
  const [homeFlag, setHomeFlag] = useState(false)
  const [filteredBlinks, setFilteredBlinks] = useState([])



  console.log('filteredBlinks' , filteredBlinks)


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
      setHomeFlag(false)
    };

    getData();
  }, [homeFlag]);


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

  // three dots 
  const handleThreeDots = () => {

    console.log('HELLO FROM § DOTS')
  }

  return (
    <div className="home  d-flex flex-column align-items-center justify-content-center ">
      <div className="border-bottom w-100 blink  d-flex flex-column align-items-center justify-content-center">
        <Row className=" d-flex justify-content-between  w-100">
          <Col>
            <h2
            onClick={() => setHomeFlag(true)}
            className="fw-bold cursor-pointer">Home</h2>
          </Col>
          <Col className="">
            <p onMouseOver={handleThreeDots} className="threedots fs-1 text-end">...</p>
          </Col>
        </Row>
        <Row className="mt-2 d-flex justify-content-between  w-100">
          <Col className="col-2">
            <img className="blink-user-img" src={img1} alt="user-img" />
          </Col>
          <Col className="col-10">
            <MyTextarea setData={setNewBlink} data={newBlink}/>
          </Col>
        </Row>
        <Row className="w-100">
          <Col className="col-12 text-end">
            <button
              className="blink-button m-2 btn w-25 fs-4  text-center rounded-pill"
              onClick={handleSave}
            >
              Blink
            </button>
          </Col>
        </Row>
      </div>

      <h2 className="color w-100 fs-4 mt-3 mb-3 ps-2 ">{blinks.length} Blinks</h2>

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
