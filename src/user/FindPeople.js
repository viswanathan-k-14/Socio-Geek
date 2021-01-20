import React, { Component } from "react";
import { findPeople, follow } from "./apiUser";
import DefaultProfile from "../images/avatar.jpg";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

class FindPeople extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            error: "",
            open: false
        };
    }

    componentDidMount() {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        findPeople(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
            }
        });
    }

    clickFollow = (user, i) => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        follow(userId, token, user._id).then(data => {
            if (data.error) {
                this.setState({ error: data.error });
            } else {
                let toFollow = this.state.users;
                toFollow.splice(i, 1);
                this.setState({
                    users: toFollow,
                    open: true,
                    followMessage: `Following ${user.name}`
                });
            }
        });
    };

    renderUsers = users => (
        <div className="row">
            {users.map((user, i) => (
                <div className="card col-md-4"  style={{backgroundColor:"rgba(66,133,244,0.2)"}} key={i}>
                    <img
                         style={{height:"250px",width:"auto",borderRadius:"45%",marginTop:"20px"}}
                        className="img-thumbnail"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${
                            user._id
                        }`}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        alt={user.name}
                    />
                    <div className="card-body">
                        <h5 className="card-title text-center">{user.name}</h5>
                        <p className="card-text">{user.email}</p>
                        <Link
                            to={`/user/${user._id}`}
                            className="btn btn-raised btn-primary btn-md rnd"
                        >
                            View Profile <i class="fa fa-user-circle" aria-hidden="true" style={{fontSize:"130%"}}></i>
                            
                        </Link>
                        
                        <button
                            onClick={() => this.clickFollow(user, i)}
                            className="btn btn-raised btn-info float-right btn-md rnd"
                        >
                            Follow{"     "}<i class="fa fa-user-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const { users, open, followMessage } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5 text-primary">Suggested People</h2>

                {open && (
                    
                    <div className="alert alert-dismissible  fade show text-primary" role={{alert}} style={{backgroundColor:"rgba(66,133,244,0.2)",borderRadius:"10px"}}><p className="lead"><strong>{followMessage}</strong></p><button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  </div>
                )}

                {this.renderUsers(users)}
            </div>
        );
    }
}

export default FindPeople;
