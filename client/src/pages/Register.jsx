import React, { Component } from "react";
import axios from "axios";
import classes from "./Register.module.css";
import { Link } from "react-router-dom";

export default class Register extends Component {
    //uzmi podatke od korisnika i spremi ih u definirane varijable
    userData;
    constructor(props) {
        super(props);
        this.state = {
            registerData: {
                firstName: "",
                lastName: "",
                userName: "",
                eMail: "",
                location: "",
                password: "",
                isLoading: "",
            },
            msg: "",
        };
    }

    onChangeHandler = (e, key) => {
        const { registerData } = this.state;
        registerData[e.target.name] = e.target.value;
        this.setState({ registerData });
    };

    //oSH salje podatke preko APIja backendu
    onSubmitHandler = (e) => {
        e.preventDefault();
        this.setState({ isLoading: true });
        axios
            .post("http://localhost:3001/api/user-registration", this.state.registerData)
            .then((response) => {
                this.setState({ isLoading: false });
                //ukoliko je poziv = 200, to znaci da su uspjesno poslani podaci na backend
                if (response.data.status === 200) {
                    this.setState({
                        msg: response.data.message,
                        registerData: {
                            firstName: "",
                            lastName: "",
                            userName: "",
                            eMail: "",
                            location: "",
                            password: "",

                        },
                    });
                    setTimeout(() => {
                        this.setState({ msg: "" });
                    }, 2000);
                }

                if (response.data.status === "failed") {
                    this.setState({ msg: response.data.message });
                    setTimeout(() => {
                        this.setState({ msg: "" });
                    }, 2000);
                }
            });
    };

    render() {
        const isLoading = this.state.isLoading;

        return (
            <div>
                <form className="containers shadow">
                    <label for="firstName">Name</label>
                    <input
                        type="name"
                        name="firstName"
                        placeholder="Enter your name"
                        value={this.state.registerData.firstName}
                        onChange={this.onChangeHandler}
                    />
                    <label for="surname">Surname</label>
                    <input
                        type="name"
                        name="surname"
                        placeholder="Enter your surname"
                        value={this.state.registerData.lastName}
                        onChange={this.onChangeHandler}
                    />
                    <label for="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={this.state.registerData.eMail}
                        onChange={this.onChangeHandler}
                    />
                    <label for="userName">User name</label>
                    <input
                        type="name"
                        name="userName"
                        placeholder="Enter your user name"
                        value={this.state.registerData.userName}
                        onChange={this.onChangeHandler}
                    />
                    <label for="location">Location</label>
                    <input
                        type="location"
                        name="location"
                        placeholder="Enter your location"
                        value={this.state.registerData.location}
                        onChange={this.onChangeHandler}
                    />
                    <label for="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your location"
                        value={this.state.registerData.password}
                        onChange={this.onChangeHandler}
                    />
                    <p className="text-white">{this.state.msg}</p>
                    <button className="text-center mb-4"
                        color="success"
                        onClic={this.onSubmitHandler} >
                        Register
                        {isLoading ? (
                            <span className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : (
                            <span></span>
                        )}
                    </button>
                    <Link to="/login" className="text-white ml-5">Already member</Link>
                </form>
            </div>
        );

    }


}