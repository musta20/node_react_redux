import React, { Component } from 'react';
import Joi from "@hapi/joi";
import axios from "axios";

class Login extends Component {
   
    constructor(){

          super();
          this.state = {
            email:'',
            password:"",
            goHome:false,
            EmailAlert:"",
            RedBorderEmail:""
                }
                this.onchange=this.onchange.bind(this)
                this.valdateEmail=this.valdateEmail.bind(this)
                this.onSubmitForm = this.onSubmitForm.bind(this)

    }

    
    async valdateEmail(e){
      var UserScima = Joi.object({ email: Joi
          .string()
          .min(10) 
          .max(25)
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        });

          try{
            await UserScima.validateAsync({"email":e.target.value});
          }catch(e){
            console.log(e.message)
            this.setState({EmailAlert:e.message,RedBorderEmail:'border border-danger'})
            return
          }
          this.setState({EmailAlert:'',RedBorderEmail:''})

    }

    async  onSubmitForm (e){
      e.preventDefault();

      var UserScima = Joi.object({ email: Joi
        .string()
        .min(10) 
        .max(25)
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi
              .string()
              .required()
        
      });
       // const{email,password} = this.state;
        try{
          await UserScima.validateAsync({'email':this.state.email,'password':this.state.password});
        }catch(e){
          console.log(e.message)
          this.AlertMessage= <div><strong>{e.message}</strong></div>;
          this.handleClickShowAlert();
          return
        }
        
     axios.post("http://127.0.0.1:4000/Login",{name:this.state.name,
     email:this.state.email})
     .catch(e=>{
       console.log(e);

     })
     .then(e=>{
      this.AlertMessage=<strong>you have login</strong>;
      this.setState({AlertWarning:true})
      this.handleClickShowAlert();
    setTimeout(() => {
        this.setState({goHome:true});

        }, 2000);

     })
      
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

    onchange=(e)=>{
      this.setState({[e.target.name]:e.target.value})
    }




    render() { 
      if(this.state.goHome){
        window.location.href = "http://127.0.0.1:4000/";
      }
        return ( 
          <div className="bg-white w-100 h-100 m-15  d-flex justify-content-center ">
                
          <div className="bg-light border h-75 w-75 m-4 p-4 d-flex justify-content-center"> 
            <form className='w-50 text-dark ' >
            
            <div style={(this.state.showingAlert) ? {visibility: 'visible ' }: {visibility : 'hidden'} } 
            className={`alert  ${this.state.AlertWarning ? 'alert-success' :  'alert-warning'} alert-dismissible fade show`} role="alert">
               {this.AlertMessage}
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <h5>Login:</h5>
  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
<input name='email' onBlur={this.valdateEmail} onChange={this.onchange} type="email" className={` ${this.state.RedBorderEmail} form-control`} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
<small  className="form-text  text-danger">{this.state.EmailAlert}</small>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input onChange={this.onchange} name='password' type="password" className="form-control" id="exampleInputPassword1" placeholder="Password">
    </input>
  </div>
  <div className="form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>

  <div className="card-footer text-muted ">
                              <a href="#" className="btn btn-info  m-1">Forgot Password</a>
                              <a href="#" 
                              onClick={this.onSubmitForm}
                               className="btn btn-success float-right m-1">  Login</a>
                            </div>
                            </form>
                            </div>
                 
                        </div> );
    }
}
 
export default Login;