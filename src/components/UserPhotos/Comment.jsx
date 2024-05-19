import axios from "axios";
import { useEffect, useState } from "react"
import moment from "moment";
import Loading from "../Loading/Loading";

function formatDateTime(isoDateString) {
    return moment(isoDateString).format("DD-MM-YYYY HH:mm");
  }

export default function Comment({comment}){
    const [userName, setUserName] = useState()
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token")
    useEffect(() => {
        const fetchUserComment = async () => {
            const headers = { 'Authorization': `Bearer ${token}` };
            try{
              const userRes = await axios.get(
                `https://ryrv32-8081.csb.app/api/user/${comment.user_id}`,
                {headers: headers}
              )
              setUserName(userRes.data.first_name)
              setLoading(false)
            }catch(e){
              console.error("Error to comment ", e)
              setLoading(false)
            }
          }
    
          fetchUserComment()
    },[])
    if(loading){
        return 
    }
    return(
        <div key={comment._id} className="comment">
            <span className="cmt-date">{formatDateTime(comment.date_time)}
            </span>
            <span className="cmt-content">
                <span className="cmt-user">{userName || "unset"}: </span>
                {comment.comment}
            </span>
        </div>
    )
}