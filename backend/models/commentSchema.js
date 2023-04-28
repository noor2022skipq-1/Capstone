const Joi = require("joi");

exports.commentSchema=Joi.object({
    user_id: Joi.string().required(),
    story_id:Joi.string().required(),
    comment:Joi.string().required(),
});
