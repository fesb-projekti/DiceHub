import classes from "./LandingPageLayout.module.css";

function LandingPageNavigation(props) {
    return (
        <div className={classes.landingPageLayout}>
            <main className={classes.main}>{props.children}</main>
        </div>
    );
}

export default LandingPageNavigation;