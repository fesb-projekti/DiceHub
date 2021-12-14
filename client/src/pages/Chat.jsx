import React from "react";
import './Chat.module.css';
import Avatar from "@material-ui/core/Avatar";

function Chat({ name, message, profilePic, timeStamp}) {
    return (
        <div className = "chat">
            <Avatar className = "chat__image" src = {profilePic} />
            <div className = "chat__details">
                <h2>{name}</h2>
                <p>{message}</p>
            </div>
            <p className = "chat__timestamp">{timeStamp}</p>
        </div> 
    )
}


export default Chat;