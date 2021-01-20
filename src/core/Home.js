import React from "react";
import Posts from "../post/Posts";
import '../style.css';
import {Link} from 'react-router-dom';
import {isAuthenticated } from "../auth";
const Home = () => (
    <>
    <div className="jumbotron text-center">
      <h1 className="text-primary">SOCIO GEEK</h1>
     <div className="lead text-primary"><h3>Get ready to be connected ! <i class="fa fa-comments" aria-hidden="true"></i></h3></div>
     <br/>
    {!isAuthenticated() && ( <div className="d-inline-block">
     {<Link to="/signin" className="btn btn-inline btn-raised btn-primary mr-5 rnd">
       {" "}
      Login    <i class="fa fa-sign-in" aria-hidden="true"></i>
   </Link> }
   {<Link to="/signup" className="btn btn-inline btn-raised btn-primary rnd">
       {" "}
      Register  <i class="fa fa-user-plus" aria-hidden="true"></i>
   </Link> }
     </div>)}
    </div>
    <div className="container">
      
      <Posts />
    </div>
  </>
);

export default Home;
