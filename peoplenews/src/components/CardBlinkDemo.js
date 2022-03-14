import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Card, Image } from "semantic-ui-react";
import Img4 from "./pictures/4.jpg";
import "../features/features.scss";
import { UserContext } from "./context";

const CardBlinkDemo = (props) => {
  const { userId } = useContext(UserContext);

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
  return (
    <Card.Group className="card-blink-demo w-100 d-flex">
      <Card className="w-100">
        <Card.Content>
          <Image floated="right" size="mini" src={Img4} />
          <Card.Header>{props.item.owner.username}</Card.Header>
          <Card.Meta>{props.item.owner.email}</Card.Meta>
          <Card.Description className="fw-bolder fs-1 w-100 bg-success">
            {props.item.text}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="green">
              Approve
            </Button>
            <Button
              className={
                props.item.owner._id == userId ? "showDelete" : "hideDelete"
              }
              onClick={() => handleDelete(props.item._id)}
              basic
              color="red"
            >
              DELETE
            </Button>
          </div>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default CardBlinkDemo;
