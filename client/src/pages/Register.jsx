import React, { Component } from "react";
import axios from "axios";
import classes from "./Register.module.css";
import { Link } from "react-router-dom";

export default class Register extends Component {
    
    constructor(){
        super();

        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            location: '',
            password: '',
            dateOfBirth: '',
        }

        this.email = this.email.bind(this);
        this.password = this.password.bind(this);
        this.firstName = this.firstName.bind(this);
        this.lastName = this.lastName.bind(this);
        this.userName = this.userName.bind(this);
        this.location = this.location.bind(this);
        this.dateOfBirth = this.dateOfBirth.bind(this);
    }

    email(event){
        this.setState({email: event.target.value})
    }

    password(event){
        this.setState({password: event.target.value})
    }

    firstName(event){
        this.setState({firstName: event.target.value})
    }

    lastName(event){
        this.setState({lastName: event.target.value})
    }

    userName(event){
        this.setState({userName: event.target.value})
    }

    location(event){
        this.setState({location: event.target.value})
    }

    dateOfBirth(event){
        this.setState({dateOfBirth: event.target.value})
    }

    register(event){

        fetch('http://localhost:3001/user-registration', {
            method: 'post',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                userName: this.state.userName,
                password: this.state.password,
                location: this.state.location,
                email: this.state.email,
                dateOfBirth: this.state.dateOfBirth,
            })
        }).then((Response) => Response.json())
            .then((Result) => {
                if (Result.Status == 'Success')
                    this.props.histoy.push("/profile");
                    else
                    alert("You are not authenticated!")
            })
    }


    render() {
        const isLoading = this.state.isLoading;

        return (
            <div className={classes.register}>
                <div className={classes.registerBox}>
                        <h3>DiceHub Register</h3>
                    <form className={classes.container}>
                        <label for="firstName">Name</label>
                        <input
                            type="name"
                            name="firstName"
                            placeholder="Enter your name"
                            onChange={this.firstName}
                        />
                        <label for="lastName">Surname</label>
                        <input
                            type="name"
                            name="lastName"
                            placeholder="Enter your surname"
                            onChange={this.lastName}
                        />
                        <label for="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={this.email}
                        />
                        <label for="userName">User name</label>
                        <input
                            type="name"
                            name="userName"
                            placeholder="Enter your user name"
                            onChange={this.userName}
                        />
                        <label for="location">Location</label>
                        <input
                            type="location"
                            name="location"
                            placeholder="Enter your location"
                            onChange={this.location}
                        />
                        <label for="dateOfBirth">Date of birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            placeholder="Enter your date of birth"
                            onChange={this.location}
                        />
                        <label for="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={this.password}
                        />
                        <p className="text-white">{this.state.msg}</p>
                        <button 
                            color="success"
                            onClick={this.register} >
                            Create account
                            {isLoading ? (
                                <span className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            ) : (
                                <span></span>
                            )}
                        </button>
                        <button><Link to="/login" className="text-white ml-5">Already member</Link></button>
                    </form>
                </div>
            </div>
        );

    }


}