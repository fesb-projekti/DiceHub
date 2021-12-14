import React, { useState } from 'react';
import Avatar from "@material-ui/core/Avatar";
import "./ChatScreen.css";



function ChatScreen() {

    const[input, setInput] = useState("");
    const [messages, setMessages] = useState([
        {

        }
    ])

    const handleSend = e =>{
        e.preventDefault();
        
        setMessages([...messages, {message: input}]);
        setInput('');
    };

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
                        <p className="ChatScreen_text">{message.message}</p>
                    </div>
                ) : (
                    <div className="chatScreen__message">
                        <p className="ChatScreen_textUser">{message,message}</p>
                    </div>
                )
            ))}
            <div>
                <form  className="chatScreen__input">
                    <input 
                    value={input}
                    onChange={e=> setInput(e.target.value)}
                    className='chatScreen__inputField'
                    placeholder='Write a message' type = "text"/>
                    <button onClick={handleSend}
                    type="submit" className='chatScreen__inputButton'>SEND</button>
                </form>
            </div>
                    </div>

    );
                }
            



export default ChatScreen;
