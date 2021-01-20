import React, { Component } from "react";
import { list } from "./apiUser";
import DefaultProfile from "../images/avatar.jpg";
import { Link } from "react-router-dom";
import '../style.css'
class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
            }
        });
    }

    renderUsers = users => (
        <div className="row">
            {users.map((user, i) => (
                <div className="card col-md-4 " style={{backgroundColor:"rgba(66,133,244,0.2)"}} key={i}>
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
                        <p className="card-text text-center">{user.email}</p>
                        <div className="text-center">
                        <Link
                            to={`/user/${user._id}`}
                            className="btn btn-raised btn-primary rnd">
                            View Profile <i class="fa fa-user-circle" aria-hidden="true" style={{fontSize:"130%"}}></i>
                        </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const { users } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5 text-primary">Users</h2>

                {this.renderUsers(users)}
            </div>
        );
    }
}

export default Users;
