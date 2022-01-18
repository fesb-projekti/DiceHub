import axios from 'axios';
import React, {useState, useEffect } from 'react';
import "./chatOnline.css";

function ChatOnline({onlineUsers, currentId, setCurrentChat}) {

    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        const getFriends = async () =>{
            const resp = await axios.get("/users/friends/" + currentId);
            setFriends(resp.data);
        };
        getFriends();
    }, [currentId]);

    useEffect(() => {
        setOnlineFriends(friends.filter(f=>onlineUsers.includes(f._id)));
    },[friends, onlineUsers]);

    const handleClick = async (user) => {
        try{
            const resp = await axios.get(`/conversations/find/${currentId}/${user._id}`)
        }catch(err){
            console.log(err);
        }
    }

    return (
        
        <div className='chatOnline'>
            {onlineFriends.map( o => (
            
            <div className="chatOnlineFriend" onClick={() => {handleClick(o)}}>
            <div className='chatOnlineBadge'></div>
            <span className='chatOnlineName'>{o.username}</span>
            </div>
            ))};
        </div>


    )
}

export default ChatOnline
