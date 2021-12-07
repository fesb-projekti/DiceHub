import classes from "./MainLayout.module.css";
import MainNavbar from "./MainNavbar";
import MainSidebar from "./MainSidebar";

function MainNavigation(props) {
    // This is the main layout for the application, we are getting props from app and router and then we are displaying
    // that page with props.children. <MainNavbar/> is always on top as a navbar for the whole application, rest is changing.
    return (
        <div className={classes.mainLayout}>
            <MainNavbar />
            <MainSidebar /> 
            <main className={classes.main}>{props.children}</main>
        </div>
    );
}

export default MainNavigation;