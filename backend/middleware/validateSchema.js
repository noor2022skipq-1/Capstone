const { combineErrors } = require("../utils");

exports.validateSchema=(schemaValidator)=>{
    return async(req,res,next)=>{
        const {error,value}= schemaValidator(req.body);
        if(error){
            return res.status(400).send(await combineErrors(error.details));
        }
        req.body=value;
        next();
    };
}