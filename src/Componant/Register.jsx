import React, { Component } from 'react';
import passwordComplexity from 'joi-password-complexity';
import axios from "axios";
import { Redirect } from 'react-router';
import "./post.css"

import Joi from "@hapi/joi";

class Register extends Component {
            constructor(props){
              super(props)
              this.state={

                showingAlert:false,
                AlertWarning:'',
                AlertMessage:'',
                RetypePassword:"",
                MainPassword:'',
                goHome:false,
                name:"",
                email:""

              }
              this.ontypeing = this.ontypeing.bind(this);
              this.onChange = this.onChange.bind(this);
              this.onSubmitForm = this.onSubmitForm.bind(this);
              
            }
            

            
            ontypeing = (e)=>{
              this.setState({[e.target.name]:e.target.value})
            }
          

            async  onSubmitForm  (e){
          e.preventDefault();
          
    
          
          try {  
    await Joi.object({
      name: Joi
      .string()
      .min(10) 
      .required()
      .max(25),
      email: Joi
        .string()
        .min(10) 
        .max(25)
        .required()

        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        MainPassword: Joi
        .string()
        .min(8) 
        .required()

        .max(25) 
        
       }).validateAsync({name:this.state.name,email:this.state.email,password:this.state.MainPassword});
        } 
        catch (e){
            console.log(e.message)
            this.AlertMessage= <div><strong>Pleass correct!</strong>{e.message}</div>;
            this.handleClickShowAlert();
        return
        }
        var res = passwordComplexity().validate(this.state.MainPassword);
      
          if(res.error != null){
           this.AlertMessage= <div><strong>Pleass correct!</strong>{res.error.message}</div>;
           this.handleClickShowAlert();
           return
          }
          if(this.state.MainPassword != this.state.repassword){
            this.AlertMessage= <div><strong>Pleass correct!</strong>Password must match</div>;
            this.handleClickShowAlert();
            return
          }



     const {name,email} = this.state;
     axios.post("http://127.0.0.1:4000/Register",{password:this.state.MainPassword,name,email})
     .then(e=>{
      this.AlertMessage=<strong>Your account has been created successfully</strong>;
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

       
   
    render() { 
      if (this.state.goHome) {
           
        window.location.href = "http://127.0.0.1:4000/";
      } 
      const {onSubmitForm} = this;
        return ( 
            <div className="bg-white w-100 h-100 m-15  d-flex justify-content-center ">
                
                <div className="bg-light border w-75 m-4 p-4 d-flex justify-content-center"> 
               
                                <form onSubmit={onSubmitForm} className='w-50 text-dark' >
                                <h5>Register:</h5>
                                <div style={(this.state.showingAlert) ? {visibility: 'visible ' }: {visibility : 'hidden'} } 
                                className={`alert  ${this.state.AlertWarning ? 'alert-success' :  'alert-warning'} alert-dismissible fade show`} role="alert">
                                  {this.AlertMessage}
                                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>

                                <div className="form-group">
                      
                        <label for="exampleInputEmail1">Full name</label>
                    <input onBlur={this.onChange} type="text" onChange={this.ontypeing} name='name'
                     className= {`  form-control`}
                     
                      id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                     <small ref='name' className="form-text  text-danger"></small>
                      </div>



                      <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                    <input onBlur={this.onChange} name='email' type="email" onChange={this.ontypeing} 
                    className= {` form-control`} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                        <small ref='email' className="form-text  text-danger"></small>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>

                      </div>
                      <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input onBlur={this.onChange} name='MainPassword' onChange={this.ontypeing} 
                        type="password" className= {`  form-control`} id="exampleInputPassword1" placeholder="Password">
                        </input>
                        <small  ref='MainPassword' className="form-text  text-danger"></small>

                      </div>
                      <div className="form-group">
                        <label for="exampleInputPassword1">Verify The Password </label>
                        <input onBlur={this.onChange} name='repassword' type="password"
                         onChange={this.ontypeing} className= {`  form-control`} id="exampleInputPassword1" placeholder="Password">
                        </input>
                        <small ref='repassword'  className=" form-text text-danger"></small>

                      </div>
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                      </div>

                      <div className="card-footer text-muted ">
                              <a href="#" className="btn btn-info  m-1">Forgot Password</a>
                              <button 
                              type='submit'
                               className="btn btn-success float-right m-1">  Register</button>
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

        if(e.target.name =='repassword'){
          if(e.target.value != this.state.MainPassword){
            e.target.classList.add('border-danger');
            this.refs[e.target.name].innerHTML ='Password must match';
                  return
          }
          e.target.classList.remove('border-danger');
          this.refs[e.target.name].innerHTML ='';
          return
        }
      const ValE=   Joi.object({
          name: Joi
          .string()
          .min(10) 
          .max(25),
          email: Joi
            .string()
            .min(10) 
            .max(25)
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            MainPassword: Joi
            .string()
            .min(8) 
            .max(25) 
            
           }).validate({ [e.target.name]: e.target.value });
           
        if(ValE.error != null ){
          console.log('error')
          console.log(ValE.error)
          e.target.classList.add('border-danger');
          this.refs[e.target.name].innerHTML =ValE.error;
          return
        }

        if(e.target.name =='MainPassword'){
          console.log('this is MainPassword')
          var res = passwordComplexity().validate(e.target.value);
          if(res.error != null){
            console.log(res.error)
            e.target.classList.add('border-danger');
            this.refs[e.target.name].innerHTML =res.error.message;
            return        
          }
        }
    
    
        console.log('no error')
        e.target.classList.remove('border-danger');
          this.refs[e.target.name].innerHTML ='';

          

     
        return;
    
    }
}
 
export default Register;