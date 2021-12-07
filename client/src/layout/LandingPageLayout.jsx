import classes from "./LandingPageLayout.module.css";

function LandingPageNavigation(props) {
    return (
        <div className={classes.landingPageLayout}>
            <h4>
                Landing page is renderd here by routing, remove this after the landing page is implemented
                and traverse the links to change the route from the LandingPage component, unlike MainLayout 
                with its navbar which is constant and the changing main html tag which renders the routed page.
            </h4>
            <main className={classes.main}>{props.children}</main>
        </div>
    );
}

export default LandingPageNavigation;