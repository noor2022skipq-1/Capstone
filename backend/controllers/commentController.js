const { closeConnection, getConnection } = require("../db/connection");

exports.comment=async(req,res)=>{
    try {
        const connection = await getConnection();
        await connection.collection('Comments').insertOne({...req.body,dateTime:new Date()});
        await closeConnection();
        return res.status(200).json("Comment Successfull");
    } catch (error) {
        await closeConnection();
        return res.status(400).json(error);
    }
};  