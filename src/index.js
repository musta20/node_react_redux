import React from 'react';
import ReactDOM from 'react-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Post from "./Componant/Post";
import CreatePost from "./Componant/creatPost";
import Footer from "./Componant/Footer";
import UpdatePost from "./Componant/updatePost";
import ShowPost from "./Componant/showPost";
import Login from "./Componant/logIn"
import Register from "./Componant/Register";
import UserUpdate from "./Componant/userUpdate";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import * as serviceWorker from './serviceWorker';
import Navbar from './Componant/navBar';

ReactDOM.render(<React.Fragment>
  <Provider store = {store}>
  <Router>
  <Navbar/>
  <div className="container">
     <div className='row'>
           <Switch>       
            <Route path="/CreatePost" component={CreatePost} />
            <Route path="/update/:id" component={UpdatePost} />
            <Route path="/login" component={Login} />
            <Route path="/UserUpdate" component={UserUpdate} />
            <Route path="/Register" component={Register} />
            <Route path="/Post/:id" component={ShowPost} />
            <Route path="/" component={Post} />
            </Switch>
            </div>
          </div>
  </Router>
  </Provider>
  <Footer></Footer>
    </React.Fragment>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
