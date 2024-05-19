import React, { useEffect, useState } from "react";

import "./styles.css";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Loading from "../Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

function formatDateTime(isoDateString) {
  return moment(isoDateString).format("DD-MM-YYYY HH:mm");
}

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos () {
    const photoUser = useParams();
    const [photos, setPhotos] = useState([])
    const [userName, setUserName] = useState("")
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token")
    const history = useNavigate()
    useEffect(() => {
      const fetchPhotoOfUser = async () => {
        const headers = { 'Authorization': `Bearer ${token}` };
        try{
          const res = await axios.get(
            `https://ryrv32-8081.csb.app/api/photo/photosOfUser/${photoUser.userId}`,
            {headers: headers}
          )
          setPhotos(res.data)
          const userRes = await axios.get(
            `https://ryrv32-8081.csb.app/api/user/${photoUser.userId}`,
            {headers: headers}
          )
          setUserName(userRes.data.first_name)
          setLoading(false)
          console.log("Success to fetch photos of user with id " + photoUser.userId)
        }catch(e){
          console.error("Error to fetch photo", e)
          setLoading(false)
        }
      }

      fetchPhotoOfUser()
    },[])
    /*
    
    */

    if(loading){
      return (
        <>
          <Loading />
        </>
      )
    }

    return (
      <div className="photos-area">
        <div className="back" onClick={() => history(`/users/${photoUser.userId}`)}>
            <FontAwesomeIcon icon={faArrowAltCircleLeft} className="back-icon"/>
          </div>
        <div className="user-of-photo">
          <span style={{ fontWeight: 'bold', fontSize: "2rem" }}>Photos of {userName}</span>
        </div>
        <div className="photos-flex-box">
          {photos?.map(photo => (
            <div key={photo._id} className="photos-container">
              <span className="photo-time"> {formatDateTime(photo.date_time)}</span>
              <Link to={`/photo/${photo._id}`}>
                  <img src={photo.file_name} alt="" className="photo"/>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
}

export default UserPhotos;
