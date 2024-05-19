import React, { useContext } from "react";
import { AppBar, Toolbar } from "@mui/material";

import "./styles.css";
import { MyContext } from "../AppContext/contextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar () {
    const {user, setUser} = useContext(MyContext)
    const goTo = useNavigate()
    const token = localStorage.getItem("token")
    const handleSignOut = () => {
      localStorage.removeItem("token");
      setUser(undefined)
      goTo("/login")
    }
    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar className="toolbar">
          <Link className="hello-topbar" to={user ? `/users/${user._id}` : `/login`}>
            {user ? `Hello ${user?.first_name } ${user?.last_name }` : "Please log in to use our app"}
          </Link>
          {token && 
          <div id="log-out">
            <FontAwesomeIcon icon={faSignOut} className="sign-out" onClick={handleSignOut}/>
          </div>}
        </Toolbar>
      </AppBar>
    );
}

export default TopBar;
