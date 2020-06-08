import React, { Component } from 'react';
import PropType from "prop-types";
import {connect} from 'react-redux';
import SideBar from "./sideBar";


import { Redirect } from 'react-router';

import {getPost} from "../Action/postAction";
class ShowPost extends Component {

    constructor(props){
        super(props);
        this.state = {
            title:'',
            body:'',
            showingAlert: false,
            alertmessage:'',
            redirect:false,
            alertwarning:false

        };
        

          console.log("constructor");
        

    }
   
    componentWillMount() {    
        this.props.getPost(this.props.match.params.id,(d)=>{
            
        });     
       }
      

    render() {
        const { redirect } = this.state;

        if (redirect) {
           
          return <Redirect to='/'/>;
        } 
        return (
          <React.Fragment>
        <br></br>
        <div className='col-md-8'>
        <br></br>
        <br></br>
          <h1 className="my-4">
            {this.props.post.title}
          <small>Secondary Text</small>
        </h1><hr></hr>
        <div dangerouslySetInnerHTML={{__html: this.props.post.body}}></div>
        <hr></hr>
        <br></br>
        <br></br>
        </div>
        <SideBar></SideBar>
        </React.Fragment>
          
        );
    }

}
ShowPost.PropType = {
    getPost:PropType.func.isRequired,
    post:PropType.object.isRequired

};

  const mapStateToProps = state => ({
    post:state.posts.itemp
  })
export default connect(mapStateToProps,{getPost}) (ShowPost);