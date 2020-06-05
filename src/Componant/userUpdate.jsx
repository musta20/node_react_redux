import React, { Component } from 'react';
import passwordComplexity from 'joi-password-complexity';
import axios from "axios";
import { Redirect } from 'react-router';
import Joi from "@hapi/joi";

class UserUpdate extends Component {
            constructor(props){
              super(props)
              this.state={
               
                showingAlert:false,
                AlertWarning:'',
                AlertMessage:'',
               
                goHome:false,
                name:"",
                email:"",
                imgurl:""
              
              }
              this.onChangeHandler = this.onChangeHandler.bind(this)
              this.ontypeing = this.ontypeing.bind(this);
              this.onChange = this.onChange.bind(this);
              this.onSubmitForm = this.onSubmitForm.bind(this);
              this.handleClick = this.handleClick.bind(this);
              
            }

            componentWillMount() {   
                axios.get("http://127.0.0.1:4000/Mydata/").catch(e=>{

                }).then(e=>{
                        const datais = e.data;
                        console.log(datais);
                        console.log(datais.email);
                        this.setState({
                            email:datais.email,
                            name:datais.name,
                            imgurl:datais.imgurl
                        })
                })
                        
                    
               }

            ontypeing = (e)=>{
              this.setState({[e.target.name]:e.target.value})
            }
          

            async  onSubmitForm  (e){
          e.preventDefault();
          
          var UserScima = Joi.object({
            name: Joi
            .string()
            .min(10) 
            .max(25)
            .required(),
            email: Joi
              .string()
              .min(10) 
              .max(25)
              .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
              .required(),
             
             });
          
          
          try {  
    await UserScima.validateAsync({name:this.state.name,email:this.state.email});
        } 
        catch (e){
            console.log(e.message)
            this.AlertMessage= <div><strong>Pleass correct!</strong>{e.message}</div>;
            this.handleClickShowAlert();
        return
        }
       


const {name , email} = this.state;
     axios.put("http://127.0.0.1:4000/user",{name,email})
     .then(e=>{
      this.AlertMessage=<strong>Your account has been Updated successfully</strong>;
      this.setState({AlertWarning:true})
      this.handleClickShowAlert();

      setTimeout(() => {
        this.setState({goHome:true});

        }, 2000);

               //redirect

     })
     .catch((error)=>{
      if(error.response ||error.response.status==200){
       }
     })
        }

        onChangeHandler=event=>{
        

          const data = new FormData()
          data.append('file', event.target.files[0])
          axios.post("http://127.0.0.1:4000/UserImg", data, { 
             // receive two    parameter endpoint url ,form data
         }).then(res => { // then print response status
          this.refs.uImg.src="http://127.0.0.1:4000/imges/"+res.data;
          console.log(res.statusText)
          console.log(res)
       })
        }
        handleClick(e) {
          this.refs.fileUploader.click();
      }

    render() { 
      if (this.state.goHome) {
           
        window.location.href = "http://127.0.0.1:4000/";
      } 
      const {onSubmitForm} = this;
        return ( 
            <div className="bg-white w-100 h-100 m-15  d-flex justify-content-center ">
                
                <div className="bg-light border w-75 m-4 p-4 d-flex justify-content-center"> 
                <input type="file" name="myFile" 
                onChange={this.onChangeHandler} id="file" ref="fileUploader" style={{display: "none"}}/>
                                <form onSubmit={onSubmitForm} className='w-50 text-dark' >
                                <h5>Update User:</h5>
                                <div style={(this.state.showingAlert) ? {visibility: 'visible ' }: {visibility : 'hidden'} } 
                                className={`alert  ${this.state.AlertWarning ? 'alert-success' :  'alert-warning'} alert-dismissible fade show`} role="alert">
                                  {this.AlertMessage}
                                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="form-group">
                                <div className="form-group">
                        <img onClick={this.handleClick}
                         className='rounded-circle btn imgs img-thumbnail'
                         ref='uImg' src= {`http://127.0.0.1:4000/imges/${this.state.imgurl}`}
                          alt="upload img photo"></img>

                        <small  className="form-text  text-danger"></small>
                        <small id="emailHelp" className="form-text text-muted">Upload personal Img.</small>

                      </div>
                        <label for="exampleInputEmail1">Full name</label>
                    <input onBlur={this.onChange} type="text" onChange={this.ontypeing} name='name'
                     className= {`  form-control`}
                     value={this.state.name}
                     id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                     <small ref='name'  className="form-text  text-danger"></small>
                      </div>
                    
                      <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                    <input onBlur={this.onChange} name='email'
                                         value={this.state.email}

                    type="email" onChange={this.ontypeing} 
                    className= {`  form-control`} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                        <small ref='email' className="form-text  text-danger"></small>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>

                      </div>
                    
                     

                      <div className="card-footer text-muted ">
                              <a href="#" className="btn btn-info  m-1">Change Password</a>
                              <button 
                              type='submit'
                               className="btn btn-success float-right m-1">  Update</button>
                            </div></form>
                            </div>
                 
                        </div> );
    }

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
  
    
    onChange (e){


    const ValE=   Joi.object({
        name: Joi
        .string()
        .min(10) 
        .max(25),
        email: Joi
          .string()
          .min(10) 
          .max(25)
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
         
          
         }).validate({ [e.target.name]: e.target.value });
         
      if(ValE.error != null ){
        console.log('error')
        console.log(ValE.error)
        e.target.classList.add('border-danger');
        this.refs[e.target.name].innerHTML =ValE.error;
        return
      }

     
  
      console.log('no error')
      e.target.classList.remove('border-danger');
        this.refs[e.target.name].innerHTML ='';

        

   
      return;
  
  }
  }
 
export default UserUpdate;