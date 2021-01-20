import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect, Link } from "react-router-dom";
import { read } from "./apiUser";
import DefaultProfile from "../images/avatar.jpg";
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from "./ProfileTabs";
import { listByUser } from "../post/apiPost";
import '../style.css';
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: { following: [], followers: [] },
      redirectToSignin: false,
      following: false,
      error: "",
      posts: []
    };
  }

  
  checkFollow = user => {
    const jwt = isAuthenticated();
    const match = user.followers.find(follower => {
      
      return follower._id === jwt.user._id;
    });
    return match;
  };

  clickFollowButton = callApi => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    callApi(userId, token, this.state.user._id).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ user: data, following: !this.state.following });
      }
    });
  };

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        let following = this.checkFollow(data);
        this.setState({ user: data, following });
        this.loadPosts(data._id);
      }
    });
  };

  loadPosts = userId => {
    const token = isAuthenticated().token;
    listByUser(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { redirectToSignin, user, posts } = this.state;
    if (redirectToSignin) return <Redirect to="/signin" />;

    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : DefaultProfile;

    return (
      <div className="container">
      <h2 className="mt-5 mb-5 text-primary" style={{textAlign:"center"}}><i class="fa fa-user" aria-hidden="true"></i>  Profile</h2>
      <div className="row text-center">
          <div className="col-md-12">
              <img
                  style={{ height: "200px", width: "auto",borderRadius:"20px"}}
                  className="img-thumbnail"
                  src={photoUrl}
                  onError={i => (i.target.src = `${DefaultProfile}`)}
                  alt={user.name}
              />
          </div>
          </div>
      <div className="row text-center">
          <div className="col-md-12">
              <div className="lead mt-2">
                  <p><i class="fa fa-user-circle" aria-hidden="true"></i> : {user.name}</p>
                  <p><i class="fa fa-envelope" aria-hidden="true"></i> : {user.email}</p>
                  <p><i class="fa fa-calendar" aria-hidden="true"></i> : {`Joined ${new Date(
                      user.created
                  ).toDateString()}`}</p>
              </div>

              {isAuthenticated().user &&
              isAuthenticated().user._id === user._id ? (
                  <div className="d-inline-block">
                      <Link className="btn btn-raised btn-info mr-5 rnd" to={`/post/create`}>Post  <i class="fa fa-plus" aria-hidden="true"></i></Link>
                      <Link
                          className="btn btn-raised btn-success mr-5 rnd" style={{paddingLeft:"15px",paddingRight:"10px",textAlign:"center"}}
                          to={`/user/edit/${user._id}`}
                      >
                          Edit  <i class="fa fa-pencil" aria-hidden="true"></i>
                      </Link>
                      <DeleteUser userId={user._id} />
                  </div>
              ) : (
                  <FollowProfileButton
                      following={this.state.following}
                      onButtonClick={this.clickFollowButton}
                  />
              )}
      
           
          </div>
        </div>
        <br/>
        <div className="row" style={{backgroundColor:"rgba(66,133,244,0.2)" , borderRadius:"200px"}}>
          <div className="col md-12 mt-5 mb-5">
            
            <p className="lead" style={{textAlign:"center"}}>{user.about?user.about:<p>Available !</p>}</p>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12 mt-5 mb-5">
            <ProfileTabs
              followers={user.followers}
              following={user.following}
              posts={posts}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
