import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import './styles.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp(){
    const [isShowed, setIsShowed] = useState(false);
    const [loading, setLoading] = useState(false)
    const goTo = useNavigate()
    const userNameRef = useRef(null)
    const passwordRef = useRef(null)
    const firstNameRef = useRef(null)
    const lastNameref = useRef(null)
    const occupationRef = useRef(null)
    const discriptionRef = useRef(null)
    const locationRef = useRef(null)

    const handleRegister = async () => {
        setLoading(true)
        if (!userNameRef.current.value 
            || !passwordRef.current.value 
            || !firstNameRef.current.value 
            || !lastNameref.current.value) {
            alert("Please fill in all input boxs!");
            return;
        }
        const body = {
            user_name: userNameRef.current.value,
            password: passwordRef.current.value,
            first_name: firstNameRef.current.value,
            last_name: lastNameref.current.value,
            occupation: occupationRef.current.value,
            location: locationRef.current.value,
            description: discriptionRef.current.value
        }
        try{
            const res = await axios.post(
                "https://ryrv32-8081.csb.app/api/admin/register",
                body
                )
            setLoading(false)
            alert("Account created successfully!")
            goTo("/login")
        }catch(e){
            setLoading(false)
            alert(e.response.data.message);
            console.error("Failed to create account!",e)
        }
    }

    return (
        <div className="login-container">
            <h2>Create new user</h2>
            <div className="input-box-container">
                <span className="input-discription">User name: </span>
                <div className="input-box">
                    <input 
                        type="text" 
                        className="username-input" 
                        placeholder="Enter user name"
                        ref={userNameRef}
                        required
                    />
                </div>
            </div>
            <div className="input-box-container">
                <span className="input-discription first-name">First Name: </span>
                <div className="input-box name">
                    <input 
                        type="text" 
                        className="firstname-input" 
                        placeholder="Enter first name"
                        ref={firstNameRef}
                        required
                    />
                
                </div>
                <span className="input-discription name">Last Name: </span>
                <div className="input-box name">
                    <input 
                        type="text" 
                        className="lastname-input" 
                        placeholder="Enter last name"
                        ref={lastNameref}
                        required
                    />
                </div>
            </div>
            <div className="input-box-container">
                <span className="input-discription">Occupation: </span>
                <div className="input-box">
                    <input 
                        type="text" 
                        className="ocupation-input" 
                        placeholder="Enter ocupation"
                        ref={occupationRef}
                        required
                    />
                </div>
            </div>
            <div className="input-box-container">
                <span className="input-discription">Location: </span>
                <div className="input-box">
                    <input 
                        type="text" 
                        className="ocupation-input" 
                        placeholder="Enter location"
                        ref={locationRef}
                        required
                    />
                </div>
            </div>
            <div className="input-box-container">
                <span className="input-discription">Discription: </span>
                <div className="input-box">
                    <textarea 
                        name="discription" 
                        id="discription" 
                        cols="30" 
                        rows="10"
                        placeholder="Enter discription"
                        ref={discriptionRef}
                        required
                    >
                    </textarea>
                </div>
            </div>
            <div className="input-box-container">
                <span className="input-discription">Password: </span>
                <div className="input-box">
                    <input 
                        type={isShowed ? "text" : "password"} 
                        className="password-input"
                        placeholder="Password"
                        ref={passwordRef}
                        required
                    />
                    <FontAwesomeIcon 
                        icon={isShowed ? faEye : faEyeSlash} 
                        className={isShowed ? "show-pass-icon" : "show-pass-icon hide"}
                        onClick={() => setIsShowed(!isShowed)}
                    />
                </div>
            </div>
            <div className="btn-login">
                <button onClick={handleRegister}>Resgister</button>
            </div>
            <span className="navigation-msg">
                Have an account? 
                <span className="link-text" onClick={() => goTo('/login')}> Log in</span>
            </span>
            {loading && <div className="alert">
                <div className="alert-text">
                    <h2>Registering user ...</h2>
                </div>
            </div>}
        </div>
    )
}