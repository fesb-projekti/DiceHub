import classes from "./Chat.module.css"
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import ChatOnline from "../components/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

export default function Chat() {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  return (
    <div className={classes.chat}>
      <div className={classes.chatMenu}>
        <input placeholder="Search for friends" className={classes.chatMenuInput} />
        <div className={classes.chatMenuWrapper}>
          <Conversation conversation="Ej disi" currentUser="Trpimir" />
          <Conversation conversation="Kad dolazis?" currentUser="Maris" />
          <Conversation conversation="Uzmi gajbu" currentUser="Danijel" />
          <Conversation conversation="Sutra cemo" currentUser="Ante" />
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {messages.map((m) => (
                  <div ref={scrollRef}>
                    <Message message={m} own={m.sender === user._id} />
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="Write a message!"
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="chatSubmitButton" /*onClick={handleSubmit}*/>
                  Send
                </button>
              </div>
            </>
          ) : ( ""
            )}
        </div>
      </div>
            <span className={classes.noConversationText}>Open a conversation to start a chat!</span>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline
            onlineUsers={onlineUsers}
            /*currentId={user._id}*/
            setCurrentChat={setCurrentChat}
          />
        </div>
      </div>
    </div >

  );
}