import React from "react";
import "./Delete.css";

export default function DeletePage(props){
    return(
        <div className="deletePage">
            <h2 className = "deleteTitle">DELETE CARD</h2>
            <button className = "deleteExit">CANCEL</button>
            <button className="deleteSubmit">DELETE</button>
        </div>
    );
}