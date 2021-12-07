import classes from "./MainNavbar.module.css";
import { Link } from "react-router-dom";

function MainNavbar() {
    return (
        <header className={classes.header}>
            <nav>
                <ul>
                    <li><Link to="/chat">Chat</Link></li>
                    <li className={classes.logo}><Link to="/">DiceHub</Link></li>
                    <li>SideBarIcon</li>
                </ul>
            </nav>
        </header >
    );
}

export default MainNavbar;