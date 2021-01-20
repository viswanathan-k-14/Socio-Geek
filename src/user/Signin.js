import React, { Component, Fragment } from "react";
import { Link,Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";
import SocialLogin from "./SocialLogin";
import '../style.css';
import imglog from '../images/signin.svg';


class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false,
            recaptcha: false
        };
    }


    
    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const { email, password } = this.state;
        const user = {
            email,
            password
        };
        // console.log(user);
        if (this.state.recaptcha) {
            signin(user).then(data =>{
                if (data.error) {
                    this.setState({ error: data.error, loading: false });
                } else {
                    // authenticate
                    authenticate(data, () => {
                        this.setState({ redirectToReferer: true });
                    });
                }
            });
        } 
        else {
            this.setState({
                loading: false,
                error: "What day is today? Please write a correct answer!"
            });
        }
    };

    signinForm = (email, password,recaptcha) => (
        
        
        <form>
            <div className="form-group">
            <i className="fa fa-envelope mr-1" aria-hidden="true"></i>  <label className="text-muted">Email</label>
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                    placeholder="Email"
                />
            </div>
            <div className="form-group">
            <i className="fa fa-lock mr-1" aria-hidden="true"></i>  <label className="text-muted">Password</label>
                <input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                    placeholder="Password"
                />
            </div>
            <div className="form-group">
               <label className="text-muted">{recaptcha ? "Verified ! you can now login !" : "What day is today?"}</label>
 
                <input onChange={this.recaptchaHandler} type="text" className="form-control"  placeholder="(Ex:Sunday)"/>
            </div>
            
            <button
                onClick={this.clickSubmit}
               className="btn btn-primary btn-raised rnd"
            >
                Login  <i class="fa fa-unlock" aria-hidden="true"></i>
            </button>
            
   <Link to="/forgot-password" className="btn btn-inline btn-raised btn-danger rnd">
       {" "}
       Forgot Password ?
   </Link>

   
        </form>
    );

    recaptchaHandler = e => {
        this.setState({ error: "" });
        let userDay = e.target.value.toLowerCase();
        let dayCount;
 
        if (userDay === "sunday") {
            dayCount = 0;
        } else if (userDay === "monday") {
            dayCount = 1;
        } else if (userDay === "tuesday") {
            dayCount = 2;
        } else if (userDay === "wednesday") {
            dayCount = 3;
        } else if (userDay === "thursday") {
            dayCount = 4;
        } else if (userDay === "friday") {
            dayCount = 5;
        } else if (userDay === "saturday") {
            dayCount = 6;
        }
 
        if (dayCount === new Date().getDay()) {
            this.setState({ recaptcha: true });
            return true;
        } else {
            this.setState({
                recaptcha: false
            });
            return false;
        }
    };

    render() {
        const {
            email,
            password,
            error,
            redirectToReferer,
            loading,recaptcha
        } = this.state;

        if (redirectToReferer) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container">
                <div className="row mb-3">
                    <div className="col-md-5">
                <h2 className="mt-5 mb-3">Login</h2>

        
                <SocialLogin />
                <hr></hr>

        
           

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    ""
                )}

                
                {this.signinForm(email, password,recaptcha)}
                </div>
                <div className="col-md-7 mt-5 animate__animated animate__wobble">
                    <img src={imglog} className="img" width="470px" height="470px" />
                    
                </div>
                </div>
                    
            </div>
        );
    }
}

export default Signin;
