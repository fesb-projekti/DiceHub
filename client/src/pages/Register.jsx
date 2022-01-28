import classes from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

function Register() {

    const history = useNavigate();
    const nameInputRef = useRef();
    const surnameInputRef = useRef();
    const avatarInputRef = useRef();
    const usernameInputRef = useRef();
    const cityInputRef = useRef();
    const countryInputRef = useRef();
    const ageInputRef = useRef();
    const passwordInputRef = useRef();

    const register = async (event) => {
        event.preventDefault();
        const name = nameInputRef.current.value;
        const surname = surnameInputRef.current.value;
        const username = usernameInputRef.current.value;
        const avatar = avatarInputRef.current.value;
        const city = cityInputRef.current.value;
        const country = countryInputRef.current.value;
        const age = ageInputRef.current.value;
        const password = passwordInputRef.current.value;

        const result = await fetch("https://dice-hub.ga/api/userRegistration", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: name,
                lastName: surname,
                userName: username,
                avatar: avatar,
                city: city,
                country: country,
                age: age,
                password: password
            })
        })
        const data = await result.json();
        if (data[0]?.status === 1) {
            history("/login");
        }
        else alert("Username already in use");
    };

    return (
        <div className={classes.register}>
            <div className={classes.registerBox}>
                <h3>DiceHub Register</h3>
                <form className={classes.container}>
                    <label htmlFor="firstName">Name</label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Enter your name"
                        ref={nameInputRef}
                    />
                    <label htmlFor="lastName">Surname</label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Enter your surname"
                        ref={surnameInputRef}
                    />
                    <label htmlFor="avatar">Avatar link</label>
                    <input
                        type="text"
                        name="avatar"
                        placeholder="Paste link to your avatar img"
                        ref={avatarInputRef}
                    />
                    <label htmlFor="userName">User name</label>
                    <input
                        type="text"
                        name="userName"
                        placeholder="Enter your user name"
                        ref={usernameInputRef}
                    />
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        name="city"
                        placeholder="Enter your city"
                        ref={cityInputRef}
                    />
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        name="country"
                        placeholder="Enter your country"
                        ref={countryInputRef}
                    />
                    <label htmlFor="age">Age</label>
                    <input
                        type="text"
                        name="age"
                        placeholder="Enter your age"
                        ref={ageInputRef}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        ref={passwordInputRef}
                    />
                    <button color="success" onClick={register} >Create account</button>
                    <button><Link to="/login" className="text-white ml-5">Already member</Link></button>
                </form>
            </div>
        </div>
    );
}

export default Register;