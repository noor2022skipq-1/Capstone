const Joi = require("joi");

exports.storySchema=Joi.object({
    user_id: Joi.string().required(),
    story_type:Joi.string().required(),
    story:Joi.any(),
    access:Joi.string().required(),
});
