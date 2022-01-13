import classes from "./Settings.module.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
    const history = useNavigate();
    const nameInputRef = useRef();
    const surnameInputRef = useRef();
    const passwordInputRef = useRef();
    const repeatPasswordInputRef = useRef();
    const ageInputRef = useRef();
    const locationInputRef = useRef();
    const aboutInputRef = useRef();
    const hasLocationInputRef = useRef();

    const onSubmit = async (event) => {
        event.preventDefault();
        const name = nameInputRef.current.value;
        const surname = surnameInputRef.current.value;
        const password = passwordInputRef.current.value;
        const repeatPassword = repeatPasswordInputRef.current.value;
        const age = ageInputRef.current.value;
        const location = locationInputRef.current.value;
        const about = aboutInputRef.current.value;
        const hasLocation = hasLocationInputRef.current.value;

        if (password !== repeatPassword) {
            alert("Passwords are not maching!");
            return;
        }
        const profile = { name, surname, password, repeatPassword, age, location, about, hasLocation };
        if(Object.values(profile).every(el=>el===null || el===""))
        {
            alert("You have not made any changes");
            return;
        }
        // await fetch("https://dice-hub.ga/api/update_profile", {
        await fetch("http://localhost:3001/update_profile", {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(profile)
        }).then(() => { alert("You have updated your profile information"); history("/profile/:id") })
    }
    return (
        <div className={classes.settings}>
            <h4>You can change the profile settings here</h4>
            <form className={classes.form} onSubmit={onSubmit}>
                <div className={classes.control}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Example: John" ref={nameInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="surname">Surname</label>
                    <input type="text" id="surname" placeholder="Example: Ford" ref={surnameInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Example: 12345678" ref={passwordInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="repeat_password">Repeat password</label>
                    <input type="password" id="repeat_password" placeholder="Example: 12345678" ref={repeatPasswordInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="age">Age</label>
                    <input type="text" id="age" placeholder="Enter your age" ref={ageInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" placeholder="What is your location?" ref={locationInputRef}></input>
                </div>
                <div className={classes.control}>
                    <label htmlFor="about">About myself</label>
                    <textarea id="about" rows="3" placeholder="Update information about yourself" ref={aboutInputRef}></textarea>
                </div>
                <div className={classes.control}>
                    <label htmlFor="has_location">Location to play</label>
                    <input type="text" id="has_location" placeholder="Do I have a location to play?" ref={hasLocationInputRef}></input>
                </div>
                <div className={classes.actions}>
                    <button>Update settings</button>
                </div>
            </form>
        </div>
    );
}

export default Settings;