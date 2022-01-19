import classes from "./Login.module.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login({ login }) {

    const history = useNavigate();
    const nameInputRef = useRef();
    const passwordInputRef = useRef();

    const onSubmit = async (event) => {
        event.preventDefault();
        const username = nameInputRef.current.value;
        const passw = passwordInputRef.current.value;
        const info = { username, passw };

        const result = await fetch("https://dice-hub.ga/api/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(info)
        });
        const data = await result.json();
        if (data[0]?.id !== undefined) {
            history("/");
            localStorage.setItem("username", data[0]?.username);
            localStorage.setItem("id", data[0]?.id);
            login(true);
        }
        else{
            alert("Incorrect login information!");
        }
    }

    return (
        <div className={classes.login}>
            <div className={classes.loginBox}>
                <h2>DiceHub Login</h2>
                <form className={classes.form} onSubmit={onSubmit}>
                    <div className={classes.control}>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" placeholder="Example: John31" ref={nameInputRef} />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Example: 12345678" ref={passwordInputRef} />
                    </div>
                    <button>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;

