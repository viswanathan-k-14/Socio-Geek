import React, { Component, Fragment } from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SocialLogin from "./SocialLogin";
import '../style.css';
import imglog from  '../images/signup2.svg';
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false
        };
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };

    clickSubmit = event => {
        event.preventDefault();
        const { name, email, password } = this.state;
        const user = {
            name,
            email,
            password
        };
        // console.log(user);
        signup(user).then(data => {
            if (data.error) this.setState({ error: data.error });
            else
                this.setState({
                    error: "",
                    name: "",
                    email: "",
                    password: "",
                    open: true
                });
        });
    };

    signupForm = (name, email, password) => (
<div className="container">
        <form>
           
            <div className="form-group">
            <i class="fa fa-info-circle" aria-hidden="true"></i>  <label className="text-muted">Name</label>
                <input
                    onChange={this.handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                    placeholder="Name"
                />
            </div>
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
            
            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary rnd" 
            >
                Register
            </button>
            {<Link to="/signin" className="btn btn-inline btn-raised btn-danger rnd">
       {" "}
      Already a member ? Login
   </Link> }
  
        </form>
        </div>
    );

    render() {
        const { name, email, password, error, open} = this.state;
        return (
            <div className="container">
                 <div className="row">
                 <div className="col-md-7 mt-5 mb-2">
                    <img src={imglog} className="img" width="430px" height="430px" />
                </div>
                
                <div className="col-md-5">
                   <h2 className="mt-5 mb-3 ml-2">Register</h2>
                <SocialLogin />
                <hr></hr>
                
               <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                <div
                    className="alert alert-info"
                    style={{ display: open ? "" : "none" }}
                >
                    New account is successfully created. Please{" "}
                    <Link to="/signin" style={{textDecoration:"none"}}>Login</Link>.
                    
                    </div>
                    

                {this.signupForm(name, email, password)}
                </div>
               
                </div>
            </div>
        );
    }
}

export default Signup;
