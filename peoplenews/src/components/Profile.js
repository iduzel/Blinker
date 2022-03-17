import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./context";
import { Row, Col } from "react-bootstrap";

export default function Profile() {
  const { userData, setUserData } = useContext(UserContext);
  const [data, setData] = useState({
    age: 0,
    address: "",
  });

  const [fileUrl, setFileUrl] = useState("");
  const [blobFile, setBlobFile] = useState(null);

  useEffect(() => {
    setData({ ...data, ...userData });
    setFileUrl(userData.image);
  }, []);

  const handleSave = async () => {
    console.log("data is ", data);

    const formdata = new FormData();

    formdata.set("_id", userData._id);

    Object.entries(data).forEach((item) => formdata.set(item[0], item[1]));

    if (blobFile) formdata.set("image", blobFile, "profile_image");

    const config = {
      headers: { "content-type": "mulitpart/form-data" },
    };

    console.log("Handlesave: formdata is", formdata.keys());

    const response = await axios.patch("/users/profile", formdata, config);

    console.log("response from profile is", response);

    if (response.data.success) setUserData({ ...response.data.user });
  };

  const handleImageChange = (e) => {
    console.log("File is", e.currentTarget.files[0]);
    // console.log('File is', e.target.files[0])

    const file = e.currentTarget.files[0];

    setFileUrl(URL.createObjectURL(file)); // create a url from file user chose and update the state

    setBlobFile(e.currentTarget.files[0]);
  };

  return (
    <div className="profile">
      <p>
        <Link to="/home">Home</Link>
      </p>

      <Row className="border border-dotted p-5">
        <Col className="">
          {" "}
          <div>
            <label>Email</label>
            <br />
            <input
              className="profile-input w-100 rounded border border border-info mb-2"
              readOnly
              value={userData.email}
            />
          </div>
          <div>
            <label>Username</label>
            <br />
            <input
              className="profile-input w-100 rounded border border border-info mb-2"
              readOnly
              value={userData.username}
            />
          </div>
          <div>
            <label>Age</label>
            <br />
            <input
              className="profile-input w-100 rounded border border border-info mb-2"
              type="number"
              value={data?.age}
              onChange={(e) => setData({ ...data, age: e.target.value })}
            />
          </div>
          <div>
            <label>Address</label>
            <br />
            <input
            className="profile-input w-100 rounded border border border-info mb-2"
              value={data?.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
            />
          </div>
        </Col>
        <Col className=" text-center"> <div>
       
        <img
            className="rounded"
          src={fileUrl}
          alt=""
          style={{ height: "300px", width: "300px", objectFit: "cover" }}
        />
          <label className="btn btn-info mt-1" htmlFor="file" style={{ cursor: "pointer" }}>
          Upload your profile image
        </label>
        <input
          accept="image/*"
          onChange={handleImageChange}
          id="file"
          type="file"
          style={{ visibility: "hidden" }}
        />
       
      </div></Col>
      <div>
        <button className="btn btn-danger w-100" onClick={handleSave}>Save profile</button>
      </div>
      </Row>

     
     
    </div>
  );
}
