import React, { Component } from 'react';
import jscookie from "js-cookie";
import {Route, Link} from "react-router-dom";
import "./post.css";
import axios from 'axios';

class  Navbar extends Component {
    state = {  }
    constructor(props){
      super(props)
      this.state={
        userImg:'',
        name:"",
        navS:null,
        goHome:false
      }
      this.logout = this.logout.bind(this);
      
    }
    logout(){
      jscookie.remove('name');
      jscookie.remove('imgurl');
      jscookie.remove('token');
      this.setState({goHome:true});

    }

    showUser(){
      const Username =jscookie.get('name');
      const imgurl =jscookie.get('imgurl');
      console.log(Username);
      if( Username != null){
        return (<React.Fragment>
          <li className="nav-item">
                <Link to="/CreatePost" className="nav-link" href="#">CreatePost</Link>
                </li>
          <li className="nav-item active">
        <a className="nav-link" onClick={this.logout} href="#">Logout</a>
        </li>
           <li className="nav-item active">
        <Link className="nav-link" to="/UserUpdate" href="#">   
                             <img onClick={this.handleClick}
                         className='rounded-circle btn smallimgs img-thumbnail'
                         ref='uImg' src={`http://localhost:4000/imges/${imgurl}`}
                          alt="upload img photo"></img></Link>
        </li>
        
        </React.Fragment>);
      }
      else{
     return <React.Fragment> <li className="nav-item active">
        <Link className="nav-link" to="/Register" href="#">Register</Link>

        </li>
        <li className="nav-item active">
        <Link className="nav-link" to="/login" href="#">Login</Link>

        </li></React.Fragment>
      }

    }


    render() { 
      if(this.state.goHome){
        window.location.href = "http://127.0.0.1:4000/";

      }
      console.log('rerender');
        return (
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <a className="navbar-brand" href="#">THE`Poss</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                <Link className="nav-link" to="/" href="#">Home</Link>
                </li>
                
               {this.showUser()}
              </ul>
            </div>
          </div>
        </nav>  );
    }
}
 
export default Navbar;