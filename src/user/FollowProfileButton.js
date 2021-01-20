import React, { Component } from "react";
import { follow, unfollow } from "./apiUser";
import '../style.css';
class FollowProfileButton extends Component {
    followClick = () => {
        this.props.onButtonClick(follow);
    };

    unfollowClick = () => {
        this.props.onButtonClick(unfollow);
    };

    render() {
        return (
            <div className="d-inline-block">
                {!this.props.following ? (
                    <button
                        onClick={this.followClick}
                        className="btn btn-success btn-raised rnd" style={{paddingLeft:"25px",paddingRight:"25px"}}
                    >
                        Follow  <i class="fa fa-user-plus" aria-hidden="true"></i>
                    </button>
                ) : (
                    <button
                        onClick={this.unfollowClick}
                        className="btn btn-danger btn-raised rnd"
                    >
                        UnFollow  <i class="fa fa-user-times" aria-hidden="true"></i>
                    </button>
                )}
            </div>
        );
    }
}

export default FollowProfileButton;
