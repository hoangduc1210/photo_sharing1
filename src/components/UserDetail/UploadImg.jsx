import { useContext, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../../firebase"
import { MyContext } from "../AppContext/contextProvider"
import axios from "axios"
import Loading from "../Loading/Loading"

export default function UploadImg(){
    const [img, setImg] = useState(null)
    const [imgUrl, setImgUrl] = useState(null);
    const [uploading, setUploading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const {user} = useContext(MyContext)
    const token = localStorage.getItem("token")

    const handleUpload = async () => {
        setIsLoading(true)
        const headers = { 'Authorization': `Bearer ${token}` };
        if(!img){
            return
        }
        try{
            const imgRef = ref(storage, `photo-sharing/imgs/${img.name}`);
            const snapshot = await uploadBytes(imgRef, img)
            const url = await getDownloadURL(snapshot.ref)
            console.log(url)
            const newPhoto = {
                user_id: user._id,
                file_name: url,
                comments: []
            }

            const res = await axios.post(
                'https://ryrv32-8081.csb.app/api/photo/new',
                newPhoto,
                {headers: headers}
            )

            console.log('Success to upload img: ', res.data)
            setUploading(false)
            setIsLoading(false)
        }catch(e){
            alert("Error to upload image!")
            console.error("Error to upload image!", e);
        }
        
    }

    const handleChange = (event) => {
        const selectedImg = event.target.files[0]
        setImg(selectedImg);
        setUploading(true); 

        const objectUrl = URL.createObjectURL(selectedImg);
        setImgUrl(objectUrl);
      };

    if(uploading){
        return(
            <div className="upload-dialog">
                <div className="upload-content">
                    {imgUrl && <img src={imgUrl} alt="preview"/>}
                    <div>
                        <button className="upload-btn" onClick={handleUpload} >Upload</button>
                        <button className="close-btn" onClick={() => setUploading(false)}>Close</button>
                    </div>
                        { isLoading && <div className="uploadingImg">
                        <Loading />
                    </div>}
                </div>
            </div>
        )
    }

    return(
        // <div className="upload-container">
        //   <span className="upload-text">----------</span>
        //   <label >
        //     <FontAwesomeIcon 
        //         icon={faArrowUpFromBracket} 
        //         className="upload-icon" 
        //     />
        //     <input 
        //         type="file" 
        //         onChange={handleChange} 
        //     />
        //   </label>
        //   <span className="upload-text">----------</span>
        // </div>
        <div className="upload-container">
  <span className="upload-text">----------</span>
  <label>
    <span className="upload-icon">Upload</span>
    <input 
      type="file" 
      onChange={handleChange} 
    />
  </label>
  <span className="upload-text">----------</span>
</div>
    )
}