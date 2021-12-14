import classes from "./MainNavbar.module.css";
import { Link } from "react-router-dom";

function MainNavbar(props) {

    return (
        <header className={classes.header}>
            <style>@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');</style>
            <nav>
                <ul>
                    <li className={classes.actionButton}><Link to="/chat"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"/></svg></Link></li>
                    <li className={classes.logo}><Link to="/">DiceHub</Link></li>
                    <li className={classes.toggle} onClick={()=>props.sidebar()}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg></li>
                </ul>
            </nav>
        </header >
    );
}

export default MainNavbar;