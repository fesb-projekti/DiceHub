import React, { useState } from 'react';
import Avatar from "@material-ui/core/Avatar";
import "./ChatScreen.css";



function ChatScreen() {

    const [messages, setMessages] = useState([
        {

        }
    ])

  return (
        <div className="chatScreen">
            <p className="chatScreen__timeStamp">!!!</p>
            {messages.map(message => (
                message.name ? (
                    <div className="chatScreen__message">
                        <Avatar
                            className="ChatScreen__image"
                            alt={message.name}
                            src={message.image}
                        />
                        <p className="ChatScreen_text">{message}</p>
                    </div>
                ) : (
                    <div className="chatScreen__message">
                        <p className="ChatScreen_textUser">{message}</p>
                    </div>
                )
            ))}
        </div>

    );
                }
            



export default ChatScreen;
