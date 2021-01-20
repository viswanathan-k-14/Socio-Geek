import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#ff9900" };
    else return { color: "#ffffff" };
};

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            
            <li className="nav-item">
                <Link className="nav-link"
                    style={isActive(history, "/")}
                    to="/">Home  <i class="fa fa-home" aria-hidden="true"></i>
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/users")}
                    to="/users"
                ><strong>Users <i class="fa fa-users" aria-hidden="true"></i></strong>
                    
                </Link>
            </li>

            {!isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signin")}
                            to="/signin"
                        >
                           <strong>Login  <i class="fa fa-sign-in" aria-hidden="true"></i></strong> 
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signup")}
                            to="/signup"
                        >
                            <strong>Register  <i class="fa fa-user-plus" aria-hidden="true"></i></strong>
                        </Link>
                    </li>
                </>
            )}
                { !isAuthenticated() &&(
                                <li>
                                    <useThemeSwitcher/>
                                </li>)

                }

{isAuthenticated() && isAuthenticated().user.role === "admin" && (
    <li className="nav-item">
        <Link
            to={`/admin`}
            style={isActive(history, `/admin`)}
            className="nav-link"
        >
            Admin  <i class="fa fa-lock" aria-hidden="true"></i>
        </Link>
    </li>
)}


            {isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <Link
                            to={`/findpeople`}
                            style={isActive(history, `/findpeople`)}
                            className="nav-link"
                        ><strong>Find People {"  "} <i class="fa fa-search" aria-hidden="true"></i></strong>
                            
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            to={`/post/create`}
                            style={isActive(history, `/post/create`)}
                            className="nav-link"
                        ><strong>New Post <i class="fa fa-plus" aria-hidden="true"></i></strong>
                            
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            to={`/user/${isAuthenticated().user._id}`}
                            style={isActive(
                                history,
                                `/user/${isAuthenticated().user._id}`
                            )}
                            className="nav-link"
                        >
                            <strong>{" "}{`${isAuthenticated().user.name}    `}<i class="fa fa-user-circle" aria-hidden="true" style={{fontSize:"120%"}}></i></strong>
                        </Link>
                    </li>
                                
                    <li className="nav-item">
                        <span
                            className="nav-link"
                            style={
                                (isActive(history, "/signup"),
                                { cursor: "pointer", color: "#fff" })
                            }
                            onClick={() => signout(() => history.push("/"))}
                        >
                            <strong>LogOut <i class="fa fa-sign-out" aria-hidden="true"></i></strong>
                        </span>
                    </li>
                </>
            )}
        </ul>
    </div>
);

export default withRouter(Menu);
