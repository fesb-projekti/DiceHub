import classes from "./MainSidebar.module.css";
import { Link } from "react-router-dom";

function MainSidebar({ active }) {
    // Using two returns with same items, but different classes to achieve a css transition
    if (active)
        return (
            <div className={classes.sidebar}>
                <span><Link to="/chat">Chat</Link></span>
                <span><Link to="/profile">Profile</Link></span>
                <span><Link to="/inventory">Inventroy</Link></span>
                <span><Link to="/settings">Settings</Link></span>
                <span><Link to="/about">About</Link></span>
                <span>Logout</span>
            </div >
        )
    else return (
        <div className={classes.hidden}>
            <span><Link to="/chat">Chat</Link></span>
            <span><Link to="/profile">Profile</Link></span>
            <span><Link to="/inventory">Inventroy</Link></span>
            <span><Link to="/settings">Settings</Link></span>
            <span><Link to="/about">About</Link></span>
            <span>Logout</span>
        </div >
    )
}

export default MainSidebar;