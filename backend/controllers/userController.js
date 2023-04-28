const { getConnection, closeConnection } = require("../db/connection");
const jwt = require('jsonwebtoken');

exports.login=async(req,res)=>{
    try {
        const {username,password}=req.body;
        const connection = await getConnection();
        const user = await connection.collection('User').findOne({username:username});
        await closeConnection();
        if(!user){
            return res.status(400).send("This username does not exist in the system.");
        }
        if(user.password!==password){
            return res.status(400).json("Incorrect password!");
        }
        const token = jwt.sign(user,"SECRET TOKEN",{expiresIn: '1h'});

        return res.status(200).json({token});
    } catch (error) {
        return res.status(400).json(error);
    }
};

exports.signup=async(req,res)=>{
    try {
        const connection = await getConnection();
        const users_with_same_username = await connection.collection("User").find({username:req.body.username}).toArray();
        if(users_with_same_username.length>0){
            return res.status(400).json("This username is already taken! Try another one");
        }
        await connection.collection("User").insertOne(req.body);
        await closeConnection();
        return res.status(200).json("Sign Up Successfull");
    } catch (error) {
        return res.status(400).json(error);
    }
};
exports.logout=(req,res)=>{
    return res.status(200).json("Logout");
};
