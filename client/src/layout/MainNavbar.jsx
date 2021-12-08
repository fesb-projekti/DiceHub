import classes from "./MainNavbar.module.css";
import { Link } from "react-router-dom";

function MainNavbar(props) {

    return (
        <header className={classes.header}>
            <nav>
                <ul>
                    <li><Link to="/chat">FunctionIcon</Link></li>
                    <li className={classes.logo}><Link to="/">DiceHub</Link></li>
                    <li className={classes.toggle} onClick={()=>props.sidebar()}>SideBarIcon</li>
                </ul>
            </nav>
        </header >
    );
}

export default MainNavbar;