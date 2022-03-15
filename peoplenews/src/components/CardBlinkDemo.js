import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import Img4 from "./pictures/4.jpg";
import "../features/features.scss";
import { UserContext } from "./context";

const CardBlinkDemo = (props) => {
  const { userId } = useContext(UserContext);
  const [singleBlinkClass, setSingleBlankClass] = useState("hideDelete");

  const handleDelete = async (id) => {
    const response = await axios.delete("/blinks/delete?id=" + id);

    console.log("handle delete response is", response);

    if (response.data.success) {
      // find the user in the state and delete it

      const temp = [...props.blinks];

      const idx = temp.findIndex((item) => item._id == id);

      if (idx > -1) temp.splice(idx, 1);

      props.setBlinks(temp);
    } else {
      alert("Error deleting user");
    }
  };

  const handleUserBlinks = (id) =>  {

    console.log(('id', id))

   props.setBlinks(props.blinks.filter((item, index) => item.owner._id == id)) 
  }

 
  

  return (
    <Card.Group className=" card-blink-demo w-100 d-flex">
      <Card className=" m-0 w-100">
        <Card.Content>
          <Image className="card-img" floated="left" src={Img4} />
          <Card.Header className="hover" onClick={() => handleUserBlinks(props.item.owner._id)} >
            {props.item.owner.username}
          </Card.Header>
          <Card.Meta>{props.item.owner.email}</Card.Meta>
          <Card.Description
            className="single-blink-dots d-flex flex-column "
            onMouseLeave={() => setSingleBlankClass("hideDelete")}
          >
            <p
              className={` ${
                props.item.owner._id == userId ? "showDelete" : "hideDelete"
              }`}
              onMouseOver={() => setSingleBlankClass("showDelete")}
            >
              ...
            </p>
            <div className={`${singleBlinkClass} deleteText `}>
              {/* className = "test abc demo " */}
              <p >Edit</p>
              <p onClick={() => handleDelete(props.item._id)} >
                Delete
              </p>
            </div>
          </Card.Description>

          <Card.Description className="ps-5 ms-3 me-3 pe-5 fw-normal fs-5 w-100 ">
            {props.item.text}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <hr style={{ width: "90%" }} />
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <span
              style={{
                cursor: "pointer",
                /* color: item.likes.includes(userData._id) ? "red" : "black", */
              }}
             /*  onClick={() => handleLikeClick(item._id)} */
            >
              Like
            </span>
            <div>Likes: {/* {item.likes.length} */}</div>
            <div>Comments: 0</div>
          </div>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default CardBlinkDemo;
