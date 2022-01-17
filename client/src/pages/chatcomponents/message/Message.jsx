import React from 'react'
import "./message.css";

export default function Message({own}) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className='messageTop'>
             <p className="messageText">
                 tekst
             </p>
            </div>
            <div className='messageBottom'></div>
        </div>
    )
}

