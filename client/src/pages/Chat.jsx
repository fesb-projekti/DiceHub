import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import ChannelContainer from '../components/ChannelContainer';
import ChannelListContainer from '../components/ChannelListContainer';
import './Chat.css';


const apiKey = '9savhsb8uzh5';

const client = StreamChat.getInstance(apiKey);

const _Chat = () => {
    return(
        
        <div className="app__wrapper">
            
            <Chat client = {client} theme="team light">
                <ChannelListContainer 
                
                />

                <ChannelContainer

                />
            </Chat>
        </div>
    );
}


export default _Chat;