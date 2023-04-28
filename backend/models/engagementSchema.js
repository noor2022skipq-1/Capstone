const Joi = require("joi");

exports.engagementSchema=Joi.object({
    user_id: Joi.string().required(),
    story_id:Joi.string().required(),
    status:Joi.string().required(),
});
