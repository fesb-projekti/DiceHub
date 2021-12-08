import classes from "./Profile.module.css";

function Profile() {
    return ( 
        <div className={classes.profile}>
            <h2>Profile is rendered here</h2>
            <h3>Content</h3>
            <h3>Content2</h3>
            <h3>Content3</h3>
        </div>
     );
}

export default Profile;