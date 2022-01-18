import axios from "axios";
import React, {useContext, useEffect, useState, useRef} from "react";
import "./Chat.module.css";
import Conversation from "./chatcomponents/conversation/Conversation";
import chatOnline from "./chatcomponents/chatOnline/chatOnline";
import {AuthContext} from "./chatcomponents/context/AuthContext";
import Message from "./chatcomponents/message/Message";
import {io} from "socket.io-client";


export default function Chat(){

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState([null]);
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers ] = useState([]);
    const {user} = useContext(AuthContext);
    const socket  = useRef(io("ws://localhost:3002"));

    const scrollRef = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:3002");
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, [])

    useEffect(() =>{
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat])

   useEffect(() => {
       socket.current.emit("addUser", user._id);
       socket.current.on("getUsers", users=>{
        setOnlineUsers(users);
       })
   }, [user])

     


    useEffect(() => {
        const getConversations = async () => {
            try{
            const resp = await axios.get("/conversations/"+user._id)
            setConversations(resp.data);
            }catch(err){
                console.log(err);
            }
        };
        getConversations();
    }, [user._id]);

    useEffect(() => {
        const getMessages = async () =>{
            try{
            const resp = await axios.get("/messages/"+currentChat._id);
            setMessages(resp.data);
            }catch(err){
                console.log(err);
            }
        };
        getMessages([currentChat]);
    }, []);

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const message = {
            sender: user._id,
            texxt: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find(member=>member !== user._id)

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage
        });



        try{
            const resp = await axios.post("/messages", message);
            setMessages([...messages, resp.data]);
            setNewMessage("");
        }catch(err){
            console.log(err);
        }
    };


    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})

    }, [messages]);

    return(
        <>
        <div className ="chat">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Search for friends" className="chatMenuInput" />
                    {conversations.map((c) => (
                        <div onClick={() => setCurrentChat(c)}>
                        <Conversation conversations = {c} currentUser={user}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {
                        currentChat?
                    <>
                    <div className="chatBoxTop">
                        {messages.map(m=>(
                            <div ref = {scrollRef}>
                            <Message message ={m} own={m.sender === user._id} />
                            </div>
                        ))}
                        <Message/>
                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatMessageInput" placeholder="Write something"
                        oChange = {(e) => setNewMessage(e.target.value)}
                        value = {newMessage}></textarea>
                        <button className="chatSubmitButton" onClick ={handleSubmit}>Send</button>

                    </div></> : <span className="noConversationText">Open a conversation to start a chat</span>}
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <chatOnline onlineUsers = {onlineUsers} currentId = {user._id} setCurrentChat={setCurrentChat}/>
                </div>
            </div>
        </div>
        </>
    )
}