const jwt = require('jsonwebtoken');
exports.isUserSignedIn=(req,res,next)=>{
    try {
        const token = req.query.authorization.split(' ')[1];
        req.user = jwt.verify(token,"SECRET TOKEN");
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"unauthorized personele"});
    }
};

