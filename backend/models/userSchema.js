const Joi = require("joi");

exports.logInSchema=Joi.object({
    username:Joi.string().required(),
    password:Joi.string().min(3).max(16).required(),
});

exports.userSchema=Joi.object({
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    username:Joi.string().required(),
    email:Joi.string().email().required(),
    photo:Joi.any(),
    password:Joi.string().min(4).max(16).required(),
});