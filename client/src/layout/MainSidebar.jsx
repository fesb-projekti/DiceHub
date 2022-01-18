import classes from "./MainSidebar.module.css";
import { Link, useNavigate } from "react-router-dom";

function MainSidebar({ active, logout }) {
    // Using two returns with same items, but different classes to achieve a css transition
    const history = useNavigate();

    function handleLogout() {
        localStorage.removeItem("username");
        history("/home");
        logout(false);
    }

    if (active)
        return (
            <div className={classes.sidebar}>
                <span><Link to="/chat">Chat</Link></span>
                <span><Link to="/profile">Profile</Link></span>
                <span><Link to="/inventory">Inventory</Link></span>
                <span><Link to="/settings">Settings</Link></span>
                <span><Link to="/about">About</Link></span>
                <div className={classes.logout}>
                    <span ><Link to="/" onClick={handleLogout}>Logout</Link></span>
                </div>
            </div >
        )
    else return (
        <div className={classes.hidden}>
            <span><Link to="/chat">Chat</Link></span>
            <span><Link to="/profile">Profile</Link></span>
            <span><Link to="/inventory">Inventory</Link></span>
            <span><Link to="/settings">Settings</Link></span>
            <span><Link to="/about">About</Link></span>
            <div className={classes.logout}>
                <span><Link to="/" onClick={handleLogout}>Logout</Link></span>
            </div>
        </div >
    )
}

export default MainSidebar;