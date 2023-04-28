const { ObjectId } = require("mongodb");
const { closeConnection, getConnection } = require("../db/connection");

exports.engage=async(req,res)=>{
    try {
        const {user_id,story_id,status}=req.body;
        const connection = await getConnection();
        await connection.collection('Engagement').insertOne({
            user_id:new ObjectId(user_id),
            story_id:new ObjectId(story_id),
            status,
        });
        await closeConnection();
        return res.status(200).json("Engagement Successfull");
    } catch (error) {
        await closeConnection();
        return res.status(400).json(error);
    }
};  