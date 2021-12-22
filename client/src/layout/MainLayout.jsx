import classes from "./MainLayout.module.css";
import MainNavbar from "./MainNavbar";
import MainSidebar from "./MainSidebar";
import {useState} from "react";

function MainNavigation(props) {
    // This is the main layout for the application, we are getting props from app and router and then we are displaying
    // that page with props.children. <MainNavbar/> is always on top as a navbar for the whole application, rest is changing.
    const [isCollapsed,setIsCollapsed] = useState(false);

    function toggleSidebar(){
        setIsCollapsed(!isCollapsed);
    }

    return (
        <div className={classes.mainLayout}>
            <MainNavbar sidebar={toggleSidebar} />
            <MainSidebar active={isCollapsed} />
            <main className={classes.main}>{props.children}</main>
        </div>
    );
}

export default MainNavigation;