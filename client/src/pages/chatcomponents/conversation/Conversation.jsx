import axios from 'axios';
import React, {useState, useEffect} from 'react'
import "./conversation.css";

function Conversation({conversation, currentUser}) {

    const [user, setUser] = useState(null)
    
    useEffect(() => {
        const friendId = conversation.members.find(m=>m !== currentUser._id);

        const getUser = async () => {
            try{
            const resp = await axios("/users?userId =" + friendId);
            setUser(resp.data)
            }catch(err){
                console.log(err);
            }
        };
        getUser()
    }, [currentUser, conversation]);

    return (
        <div className="conversation">
            <span className="conversationName">{user.username}</span>
        </div>
    )
}

export default Conversation
