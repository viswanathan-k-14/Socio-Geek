import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { socialLogin, authenticate } from "../auth";
 
class SocialLogin extends Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false
        };
    }
 
    responseGoogle = response => {
        console.log(response);
        const { googleId, name, email, imageUrl } = response.profileObj;
        const user = {
            password: googleId,
            name: name,
            email: email,
            imageUrl: imageUrl
        };
        
        socialLogin(user).then(data => {
            
            if (data.error) {
                console.log("Error Login. Please try again..");
            } else {
                console.log("signin success - setting jwt: ", data);
                authenticate(data, () => {
                    this.setState({ redirectToReferrer: true });
                });
            }
        });
    };
 
    render() {
        
        const { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
            return <Redirect to="/" />;
        }
 
        return (
            <GoogleLogin className="bg-primary text-white" style={{borderRadius:"10px"}}
                clientId="44308710657-u3ds564v9ebs208vbs1784l1v9luatlj.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
            />
        );
    }
}
 
export default SocialLogin;