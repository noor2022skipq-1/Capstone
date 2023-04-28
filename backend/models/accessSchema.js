const Joi = require("joi");

exports.accessSchema=Joi.object({
    username:Joi.string().required(),
    password:Joi.string().min(3).max(16).required(),
});
