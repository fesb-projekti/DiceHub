import React from "react";
import MainNavbar from "../layout/MainNavbar";
import "./Chat.module.css";
import Conversation from "./chatcomponents/conversation/Conversation";


export default function Chat(){
    return(
        <>
        <MainNavbar/>
        <div className ="chat">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Search for friends" className="chatMenuInput" />
                    <Conversation/>
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">

                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatMessageInput" placeholder="Write something"></textarea>
                        <button className="chatSubmitButton">Send</button>

                    </div>
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper"></div>
            </div>
        </div>
        </>
    )
}