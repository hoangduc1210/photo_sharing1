import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import './Loding.css'

const Loading = () => {
  return (
    <div className="loading-container">
      <FontAwesomeIcon icon={faSpinner} spin size="3x" className="load-icon"/>
      <p >Loading...</p>
    </div>
  );
};
export default Loading;
