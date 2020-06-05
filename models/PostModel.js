'use strict';
const mongoose = require('./Db').mongoose;
const Joi = require('@hapi/joi');

var schema =  new mongoose.Schema({
    title:{type:String,min:5,max:50,required: true},
    body:{type:String,min:55,max:1000,required: true}
});


const JoiScheam =  Joi.object({
    title: Joi.string()
        .min(3)
        .max(30)
        .required(),   
    body: Joi.string()
        .min(3)
        .max(1000)
        .required()});
const PostModel = mongoose.model('post',schema);

exports.PostModel = PostModel;
exports.JoiScheam = JoiScheam;
