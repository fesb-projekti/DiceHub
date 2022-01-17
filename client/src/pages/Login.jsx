import classes from "./Login.module.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    
    const history = useNavigate();
    const nameInputRef = useRef();
    const passwordInputRef = useRef();

    const onSubmit = async (event) => {
        event.preventDefault();
        const name = nameInputRef.current.value;
        const password = passwordInputRef.current.value;

        const info = { name,password };
        await fetch("http://localhost:3001/authorize", {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(info)
        }).then(() => { history("/") })
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

