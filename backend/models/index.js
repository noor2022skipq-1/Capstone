const { commentSchema } = require('./commentSchema');
const { engagementSchema } = require('./engagementSchema');
const { storySchema } = require('./storySchema');
const { logInSchema, userSchema } = require('./userSchema');

const validator = (schema)=>(payload)=>schema.validate(payload,{abortEarly:false});

exports.validateLogin = validator(logInSchema);
exports.validateSignUp = validator(userSchema);
exports.validateStory = validator(storySchema);
exports.validateEngagement = validator(engagementSchema);
exports.validateComment = validator(commentSchema);