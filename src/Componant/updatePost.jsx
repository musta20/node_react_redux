import React, { Component } from 'react';
import PropType from "prop-types";
import {connect} from 'react-redux';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import JoiScheam from "../Models/postModels";
import { Redirect } from 'react-router';
import {getPost,updatePost} from "../Action/postAction";

class UpdatePost extends Component {

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
        
            this.onChange = this.onChange.bind(this);
            this.onSubmit= this.onSubmit.bind(this);
            this.UpdateThePost = this.UpdateThePost.bind(this);
          console.log("constructor");
        

    }
    onChange(e){
        console.log(e.target.name);
            console.log(e.target.value);
                this.setState({[e.target.name]:e.target.value})
                console.log(this.state.title)
    }
 
    componentWillMount() {
        console.log('componentWillMount');
    
        this.props.getPost(this.props.match.params.id,(d)=>{
         this.setState({title:d.data.title})
            
        });      }
    
   
    handleClickShowAlert() {
        console.log('changed');
        this.setState({
          showingAlert: true
        });

        
    
        setTimeout(() => {
          this.setState({
            showingAlert: false
          });
        }, 5000);
      }
    async UpdateThePost(e){
        const postData = {
            title:this.state.title,
            body:this.state.body
        };
      try {  
            
            await JoiScheam.validateAsync(postData);
        
        } 
        catch (e){
            console.log(e.message)
            this.alertmessage= <div><strong>Pleass correct!</strong>{e.message}</div>;
            this.handleClickShowAlert();
        return
        }//updatePost
        //this.props.createtPost(postData, data =>{
            
        //});
        try{

          this.props.updatePost(postData,this.props.match.params.id, data =>{
            console.log(data)
              this.alertmessage=<strong>Your post has been successfully Published</strong>;
          this.setState({alertwarning:true})
          this.handleClickShowAlert();
  
          setTimeout(() => {
              this.setState({redirect:true})
  
            }, 2000);
          });
      }
      catch (e){
        this.alertmessage=<strong>Your post has been successfully Published</strong>;
        this.setState({alertwarning:true})
        this.handleClickShowAlert();

        setTimeout(() => {
            this.setState({redirect:true})

          }, 2000);
        //alert('ok');
        }
    }


    onSubmit(e){
        e.preventDefault();
        
        const postData = {
        
            title:this.state.title,
            body:this.state.body
        };
        //this.props.posts.unshift(data);
       // console.log(this.props);
       console.log(postData);

        this.props.createtPost(postData, data =>{
            alert(data)
        });
    }
  
    render() {
        const { redirect } = this.state;

        if (redirect) {
           
          return <Redirect to='/'/>;
        } 
        return (
            <div className="w-100 h-100 m-15 p-5">
<div style={(this.state.showingAlert) ? {visibility: 'visible' }: {visibility : 'hidden'} } 
className={`alert  ${this.state.alertwarning ? 'alert-success' :  'alert-warning'} alert-dismissible fade show`} role="alert">
   {this.alertmessage}
  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<input value={this.state.title} type="text" onChange={this.onChange} name='title' placeholder="Post Title"  className=" mb-2 form-control w-50"  >
</input>

                    <CKEditor
                    editor={ ClassicEditor }
                    data={this.props.post.body}
                    
                    config={ {
                        
                       ckfinder: {
                            uploadUrl: 'http://127.0.0.1:4000/profile'
                        }
                    }}
                    onInit={ editor => {

                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                     
                            this.setState({body:editor.getData()})
                        //this.state.body = editor.getData();
                       // console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
                 <div className="card-footer text-muted ">
                  <a href="#" className="btn btn-info  m-1">Draft</a>
                  <a href="#" className="btn btn-danger  m-1">Cancle</a>
                  <a href="#" onClick={this.UpdateThePost} className="btn btn-success float-right m-1">  Update Post </a>
                </div>
            </div>

        );
    }

}
UpdatePost.PropType = {
    getPost:PropType.func.isRequired,
    post:PropType.object.isRequired,
    updatePost:PropType.func.isRequired
};


  const mapStateToProps = state => ({
    post:state.posts.itemp
  })
export default connect(mapStateToProps,{getPost,updatePost}) (UpdatePost);