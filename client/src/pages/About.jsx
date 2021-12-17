import classes from "./About.module.css";

function About() {
    return (
        <div className={classes.about}>
            <h2>About</h2>
            <div className={classes.textContainer}>
                <span>DiceHub is a web application made in Javascript using React libraries</span>
                <span>For back end we are using Express.js and MySQL</span>
                <span>This is a group project for college</span>
                <span>Team members: Matea Kunac, Danijel Vlah, Trpimir Rajevskij, Maris Gicevski, Kristian Dzidzic</span>
                <span>The source code will be available once the project is finished @ https://github.com/fesb-projekti/DiceHub</span>
            </div>
            <h4>Copyright 2021-2022</h4>
        </div>
    );
}

export default About;