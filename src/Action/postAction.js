import {FETCH_POSTS,NEW_POST , GET_POST ,DELETE_POST} from "./types";
import axios from "axios";
export const fetchPosts = () =>dispatch =>{
    fetch('http://127.0.0.1:4000/post',{
        headers:{'Access-Control-Allow-Origin':'*'}
    })
    .then(res => res.json()).catch(error =>{
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            throw error
          }
    })
    .then(posts => 
        dispatch({
            type:FETCH_POSTS,
            payload:posts.data.reverse()
        }))

}

export const getPost = (postData,fuk) => dispatch =>{
    axios.get('http://127.0.0.1:4000/post/'+postData)
    .catch(error =>{
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            throw error
          }
    })
    .then(post => {fuk(post);
        dispatch({
        type:GET_POST,
        payload:post.data
    })})
}

export const createtPost = (postData,fuk) => dispatch =>{
    axios.post('http://127.0.0.1:4000/post', {
        title: postData.title,
        body: postData.body
      }).catch(error =>{
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            throw error
          }
    })
    
    .then(post => {fuk(post);
        dispatch({
        type:NEW_POST,
        payload:post.data
    })})
}

export const updatePost = (postData,id,fuk) => dispatch =>{
    axios.put('http://127.0.0.1:4000/post/'+id, {
        title: postData.title,
        body: postData.body
      }).catch(error =>{
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            throw error
          }
    })
    
    .then(post => {fuk(post);
        dispatch({
        type:NEW_POST,
        payload:post.data
    })})
}

export const deletePost = (postData,postsdata,fuk) => dispatch =>{
    axios.delete('http://127.0.0.1:4000/post/'+postData)
    .catch(error =>{
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            throw error
          }
    })
    .then(post => {fuk(post);
        dispatch({
        type:DELETE_POST,
        payload:postsdata
    })})
}



