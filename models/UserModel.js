'use strict';
const mongoose = require('./Db').mongoose;
const Joi = require('@hapi/joi');

var schema =  mongoose.Schema({
    name:{type:String,required: true},
    email:{type:String,required: true},
    password:{type:String,required: true},
    imgurl:{type:String,required: false}
}, { strict: false });
const JoiScheam =  Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),   
  imgurl: Joi.string()
        .min(3)
        .max(150),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    password: Joi.string()
        .min(3)
        .max(30)
        .required(),
    
    },{ strict: false });
const UserModel = mongoose.model('users',schema);

exports.UserModel = UserModel;
exports.JoiScheam = JoiScheam;
