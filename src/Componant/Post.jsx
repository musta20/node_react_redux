import React, { Component } from 'react';
import PropType from 'prop-types';
import {connect} from 'react-redux';
import {fetchPosts,deletePost } from "../Action/postAction";
import SideBar from "./sideBar";
import { Redirect } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./post.css";
import jscookie from "js-cookie";


class Post extends Component {

  constructor(){
    super();
    this.state ={itemseleted:false,
      gotPost : {id: 0,
        go:false},
      goUpdate : {id: 0,
                 go:false}
                 
    }
    this.gotToUpdate = this.gotToUpdate.bind(this);
    this.goPost = this.goPost.bind(this);
    this.delete = this.delete.bind(this);
  }
  componentWillMount() {
    console.log('componentWillMount');

    this.props.fetchPosts();
  }
componentWillReceiveProps(){
  console.log('componentWillReceiveProps')
}

 delete(e){
//console.log(this.props.posts.map.indexOf(e));


 var newposts=this.props.posts.filter(post => post._id != e.target.id);

 console.log(newposts);
    this.props.deletePost(e.target.id,newposts,(d)=>{
    this.setState({itemseleted:true})
    

 
  })
 
 } 
  gotToUpdate(e){
    this.setState({
      goUpdate:{
        id:e.target.id,
        go:true
      }
     })
  }
  goPost(e){
    this.setState({
      gotPost:{
        id:e.target.id,
        go:true
      }
     })
  }
  showUpdate(id){
    const Username =jscookie.get('name');
    console.log(Username);
    if( Username != null){
      return (
        <React.Fragment>
      <div onClick={this.gotToUpdate} id={id} 
      className="btn far fa-edit float-right m-1"></div>

   <div onClick={this.delete} id={id} 
     className="btn far fa-trash-alt float-right m-1"></div>
     </React.Fragment>);
    }

  }
    render() { 

      if(this.state.itemseleted){
        this.setState({itemseleted:false})

        toast.success("Post deleted successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });      
        //  this.props.fetchPosts();

    }

      if(this.state.goUpdate.go){
           
          return <Redirect to= {`/update/${this.state.goUpdate.id}`} />;
        
      }

      if(this.state.gotPost.go){
           
        return <Redirect to= {`/Post/${this.state.gotPost.id}`} />;
      
    }
      function gett(a){   
        var div = document.createElement('div');
      div.innerHTML = a;

    var img = div.querySelectorAll("img")[0]
    if(img){
      return <img style={{'max-height': 300+'px'}} className="card-img-top" src={img.src} alt="Card image cap"></img>

    }
    }
      

    const  postes = this.props.posts.map(post => <div key={post._id}  className="card mb-4">
                {gett("<div>"+post.body+"</div>")}
                <div className="card-body">
                  
    <h2  className="card-title ">
    {post.title}</h2>
                  <p  className="card-text hideimge">
                   
                 <div dangerouslySetInnerHTML={{__html: post.body.substring(0, 200)}}></div>
                                  </p>
    <div  onClick={this.goPost} id={post._id}  className="btn ">Read More →</div>
                </div>
                <div className="card-footer text-muted">
                  Posted on January 1, 2017 by
                  {this.showUpdate(post._id)}
                </div>
                </div>
         ) ;
      
      
        return ( 
          <React.Fragment>
            
        <div className='col-md-8'>
          

        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
{/* Same as */}
<ToastContainer />


          <h1 className="my-4">THE`pst
          <small>Secondary Text</small>

        </h1><hr></hr>
      
            <div >
              
            {postes}</div>
            <ul className="pagination justify-content-center mb-4">
          <li className="page-item">
            <a className="page-link" href="#">← Older</a>
          </li>
          <li className="page-item disabled">
            <a className="page-link" href="#">Newer →</a>
          </li>
        </ul>
        </div>
        <SideBar></SideBar>
        </React.Fragment>
         );
    }
}

Post.PropType = {
  fetchPosts: PropType.func.isRequired,
  deletePost: PropType.func.isRequired,
  posts:PropType.array.isRequired

}
const mapStateToProps = state => ({
  posts:state.posts.items,
})


 
export default connect(mapStateToProps,{fetchPosts,deletePost}) (Post);