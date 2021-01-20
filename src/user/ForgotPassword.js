import React, { Component } from "react";
import { forgotPassword } from "../auth";
import imglog from '../images/forgot.svg';
class ForgotPassword extends Component {
    state = {
        email: "",
        message: "",
        error: ""
    };
 
    forgotPassword = e => {
        e.preventDefault();
        this.setState({ message: "", error: "" });
        forgotPassword(this.state.email).then(data => {
            if (data.error) {
                console.log(data.error);
                this.setState({ error: data.error });
            } else {
                console.log(data.message);
                this.setState({ message: data.message });
            }
        });
    };
 
    render() {
        return (
            <div className="container">
               <div className="row mb-5">
                <div className="col-md-12">
                <h2 className="mt-5 mb-5">Ask for Password Reset</h2>
 
                {this.state.message && (
                    <h4 className="bg-success" style={{borderRadius:"10px"}}>{this.state.message}</h4>
                )}
                {this.state.error && (
                    <h4 className="bg-warning">{this.state.error}</h4>
                )}
 
                <form>
                    <div className="form-group mt-5">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Your email address"
                            value={this.state.email}
                            name="email"
                            onChange={e =>
                                this.setState({
                                    email: e.target.value,
                                    message: "",
                                    error: ""
                                })
                            }
                            autoFocus
                        />
                    </div>
                    <button
                        onClick={this.forgotPassword}
                        className="btn btn-raised btn-primary" style={{borderRadius:"30px"}}
                    >
                        Send Reset Link <i class="fa fa-paper-plane" aria-hidden="true"></i>
                    </button>
                </form>
                </div>
                </div>
                <div className="row mt-5">
                    <img src={imglog} height="300px" width="auto" />
                </div>
            </div>
        );
    }
}
 
export default ForgotPassword;