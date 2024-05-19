import React, { useState, useEffect, useContext } from "react";

import "./styles.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../AppContext/contextProvider";
import UploadImg from "./UploadImg";
import Loading from "../Loading/Loading";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const userId = useParams();
  const {user} = useContext(MyContext)
  const [userInfor, setUserInfor] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchUser = async () => {
      const headers = { 'Authorization': `Bearer ${token}` };
      try{
        const res = await axios.get(
          `https://ryrv32-8081.csb.app/api/user/${userId.userId}`,
          {headers: headers}
        );
        setUserInfor(res.data);
        setLoading(false)
      } catch(e){
        console.error(`error to fetch user with id ${userId.userId}`,e)
        setLoading(false)
      }
    };
    fetchUser();
  }, [userId]);

  if(loading){
    return (<Loading />)
  }

  return (
    // <div className="user">
    //   {(user._id === userId.userId) 
    //     && <UploadImg />
    //   }
    //   <div className="user-detail-container">
    //     <h2 className="item-center">User Information</h2>
    //     <div className="item-center">
    //       <span style={{ fontWeight: "bold", fontSize: "30px" }}>
    //         {userInfor.first_name}
    //       </span>
    //     </div>
    //     <p className="user-detail">
    //       <span className="label">ID: </span>
    //       {userInfor._id}
    //     </p>
    //     <p className="user-detail">
    //       <span className="label">First Name: </span>
    //       {userInfor.first_name}
    //     </p>
    //     <p className="user-detail">
    //       <span className="label">Last Name: </span>
    //       {userInfor.last_name}
    //     </p>
    //     <p className="user-detail">
    //       <span className="label">Location: </span>
    //       {userInfor.location}
    //     </p>
    //     <p className="user-detail">
    //       <span className="label">Description: </span>
    //       {userInfor.description}
    //     </p>
    //     <p className="user-detail">
    //       <span className="label">Occupation: </span>
    //       {userInfor.occupation}
    //     </p>
    //     <Link to={`/photos/${userId.userId}`} className="item-center link">
    //       Photos shared by {userInfor.first_name}
    //     </Link>
    //   </div>
    // </div>
   
  
    
    <div className="user">
   

     <img src ="data:image/png;base64,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"></img>
      <table border ="1">
      <thead>
    <tr>
      <th colspan="6">User Information</th>
    </tr>
  </thead>
        <tr>
          <th>id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Location</th>
          <th>Description</th>
          <th>Occupation</th>
        </tr>
        <tr>
          <td> {userInfor._id}</td>
          <td> {userInfor.first_name}</td>
          <td> {userInfor.last_name}</td>
          <td>  {userInfor.location}</td>
          <td>  {userInfor.description}</td>
          <td> {userInfor.occupation}</td>
        </tr>
      </table>
      <Link to={`/photos/${userId.userId}`} className="item-center link">
        Photos shared by {userInfor.first_name}
      </Link>
      {(user._id === userId.userId) 
      && <UploadImg />
    }

    </div>


 
  );
}

export default UserDetail;
