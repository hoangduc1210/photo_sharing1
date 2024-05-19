import { useContext, useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons"
import axios from "axios"
import { MyContext } from "../AppContext/contextProvider"
import { useNavigate, useParams } from "react-router-dom"
import Comment from "./Comment"
import moment from "moment";
import Loading from "../Loading/Loading"
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons"

function formatDateTime(isoDateString) {
  return moment(isoDateString).format("DD-MM-YYYY HH:mm");
}

export default function Photo(){
    const cmtRef = useRef(null)
    const {user} = useContext(MyContext)
    const userPhoto = useParams();
    const [photo, setPhoto] = useState(undefined)
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token")
    const [reset, setReset] = useState(0)
    const history = useNavigate();

    useEffect(() => {
      const fetchPhotoDetail = async () => {
        const headers = { 'Authorization': `Bearer ${token}` };
        try{
          const res = await axios.get(`https://ryrv32-8081.csb.app/api/photo/${userPhoto.photoId}`, {headers: headers})
          setPhoto(res.data)
          setLoading(false)
        }catch(e){
          alert("Error to fetch photo detail!")
          setLoading(false)
          console.error(e)
        }
      }

      fetchPhotoDetail()
    },[reset])

    const postComment = async () => {
        const headers = { 'Authorization': `Bearer ${token}` };
        console.log(cmtRef.current)
        const comment = {
          comment: cmtRef.current.value,
          userId: user._id
        }
        try{
          const res = await axios.post(
            `https://ryrv32-8081.csb.app/api/photo/commentsOfPhoto/${userPhoto.photoId}`,
            comment,
            {headers: headers}
          )
          setReset(reset + 1)
          cmtRef.current.value = ""
        }catch(e){
          console.log("Failed to create comment!", e)
        }
      }

    if(loading){
      return <Loading />
    }
    return photo && (
        <div className="photos-container">
            <div className="back" onClick={() => history(`/photos/${photo.user_id}`)}>
              <FontAwesomeIcon icon={faArrowAltCircleLeft} className="back-icon"/>
            </div>
            <span className="photo-time">{formatDateTime(photo.date_time)}</span>
            <img src={photo.file_name} alt="" className="photo"/>
            <div className="photo-detail">
                <span style={{textAlign: "center", textTransform: "uppercase", fontStyle: "italic", margin:"0 5px"}}>Comments</span>
                {photo.comments && photo.comments.map(comment => (
                  <Comment comment={comment} key={comment._id}/>
                ))}
            </div>
            <div className="cmt-input">
              <input 
                type="text" 
                placeholder="Enter your comment" 
                ref={cmtRef}
              />
              <button onClick={postComment}>
                <FontAwesomeIcon icon={faPaperPlane}/>
              </button>
            </div>
        </div>
    )
}
