import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName: "",
            password: "",
            msg: "",
            isLoading: false,
            redirect: false,
            errMsgUserName: "",
            errMsgPwd: "",
            errMsg: "",
        };
    }

    //sve error poruke su napisane na backendu i salju se preko APIja na front
    //oCH sluzi za keystrokeove usernamea i pwda
    onChangeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
    };

    //salje zahtjev na backend preko buttona, ako je uspjesno izvrseno
    //session odrzajemo preko localstoragea
    onLoginHandler = () => {
        this.setState({ isLoading: true });
        axios
        .post("http://localhost:3001/api/user-login", {
            userName: this.state.email,
            password: this.state.password,
        })
        .then((response) => {
            if (response.data.status === 200) {
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userData", JSON.stringify(response.data.data));
                this.setState({
                    msg: response.data.message,
                    redirect: true,
                });
            }
            if(
                response.data.status === "failed" &&
                response.data.success === undefined
            ){
                this.setState({
                    errMsgUserName: response.data.validation_error.userName,
                    errMsgPwd: response.data.validation_error.password,
                });
                setTimeout(() => {
                    this.setState({ errMsgUserName: "", errMsgPwd: ""});
                }, 2000);
            } else if (
                response.data.status === "failed" &&
                response.data.success === false
            ){
                this.setState({
                    errMsg: response.data.message,
                });
                setTimeout(() => {
                    this.setState({ errMsg: ""});
                }, 2000);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    render(){
        if (this.state.redirect){
            return <Navigate to="/LandingPage" />;
        }
        const login = localStorage.getItem("isLoggedIn");
        if (login){
            return <Navigate to="/LandingPage" />
        }
        const isLoading = this.state.isLoading;

        return(
            <div>
                <Form className = "containers">
                    <FormGroup>
                        <Label for ="userName">Username</Label>
                        <Input
                        type="name"
                        name="userName"
                        placeholder="Enter user name"
                        value = {this.state.userName}
                        onChange = {this.onChangeHandler}
                        />
                        <span className="text-danger">{this.state.msg}</span>
                        <span className="text-danger">{this.state.errMsgUserName}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for ="password">Password</Label>
                        <Input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value = {this.state.password}
                        onChange={this.onChangeHandler}
                        />
                        <span className="text-danger">{this.state.errMsgPwd}</span>
                    </FormGroup>
                    <p className ="text-danger">{this.state.errMsg}</p>
                    <Button className="text-center mb-4"
                    color="success"
                    onClic = {this.onLoginHandler}
                    >
                        Login
                        {isLoading ? (
                            <span className="spinner-border spinner-border-sm ml-5"
                            role="status"
                            aria-hidden="true"
                            ></span>
                        ):(
                            <span></span>
                        )}

                    </Button>
                </Form>
            </div>
        );
    }
}