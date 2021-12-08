import classes from "./About.module.css";

function About() {
    return ( 
        <div className={classes.about}>
            <h2>About page is rendered here</h2>
            <h3>Content</h3>
            <h3>Content2</h3>
            <h3>Content3</h3>
        </div>
     );
}

export default About;