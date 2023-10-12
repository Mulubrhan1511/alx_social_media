import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { dispatch } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.mypost);
      });
  }, []);

  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.mypost);
      });
  }, []);
  
  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "dhw1mueq4");
      fetch("https://api.cloudinary.com/v1_1/dhw1mueq4/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch("/updatepic", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              const updatedUser = { ...user, pic: data.url }; // Create a new object with updated profile picture URL
              localStorage.setItem("user", JSON.stringify(updatedUser));
              dispatch({ type: "UPDATEPIC", payload: data.url });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image, dispatch, user]);

  const updatePhoto = (file) => {
    setImage(file);
  };

  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div
        style={{
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <img
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={user ? user.pic : "loading"}
              alt="Profile"
            />
          </div>
          <div>
            <h5>{user ? user.name : "loading"}</h5>
            <h5>{user ? user.email : "loading"}</h5>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "108%",
              }}
            >
              <h5>{mypics.length || 0} Posts</h5>
              <h5>{user ? user.followers.length : 0} followers</h5>
              <h5>{user ? user.following.length : 0} following</h5>
            </div>
          </div>
        </div>
        <div className="file-field input-field" style={{ margin: "10px" }}>
          <div className="btn #64b5f6 blue darken-1">
            <span>Upload image</span>
            <input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
      </div>
      <div className="gallery">
        {mypics.map((item) => {
          return (
            <img key={item._id} className="item" src={item.photo} alt={item.title} />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;