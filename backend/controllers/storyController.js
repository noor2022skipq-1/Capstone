const { ObjectId } = require("mongodb");
const { closeConnection, getConnection } = require("../db/connection");

exports.createStory = async (req, res) => {
  try {
    const connection = await getConnection();
    await connection.collection("story").insertOne({
      ...req.body,
      views: 0,
      dateTime: new Date(),
    });
    await closeConnection();
    return res.status(200).json("Story created successfully");
  } catch (error) {
    await closeConnection();
    return res.status(400).json(error);
  }
};

exports.editStory = async (req, res) => {
  try {
    const connection = await getConnection();
    const { user_id, story_id, ...rest } = req.body;
    const result = await connection
      .collection("story")
      .updateOne({ _id: new ObjectId(story_id) }, { $set: { ...rest } });
    if (result.modifiedCount === 0) {
      return res
        .status(400)
        .json(
          "The story does not exist or does not belong to the specified user"
        );
    }
    await closeConnection();
    return res.status(200).json("Story edited successfully");
  } catch (error) {
    await closeConnection();
    return res.status(400).json(error);
  }
};
exports.deleteStory = async (req, res) => {
  try {
    const connection = await getConnection();
    const { user_id, story_id, ...rest } = req.body;
    const result = await connection
      .collection("story")
      .deleteOne({ _id: new ObjectId(story_id) }, { $set: { ...rest } });
    if (result.modifiedCount === 0) {
      return res
        .status(400)
        .json(
          "The story does not exist or does not belong to the specified user"
        );
    }
    await closeConnection();
    return res.status(200).json("Story deleted successfully");
  } catch (error) {
    console.log(error);
    await closeConnection();
    return res.status(400).json(error);
  }
};

exports.trendingStories = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection
      .collection("story")
      .aggregate([
        // {
        //   $lookup: {
        //     from: "Engagement",
        //     localField: "_id",
        //     foreignField: "story_id",
        //     as: "result",
        //   },
        // },
        

        {
          $lookup: {
            from: "Engagement",
            localField: "_id",
            foreignField: "story_id",
            as: "engagement_data"
          }
        },
        {
          $group: {
            _id: "$_id",
            user_id: { $first: "$user_id" },
            story_type: { $first: "$story_type" },
            access: { $first: "$access" },
            story: { $first: "$story" },
            views: { $first: "$views" },
            dateTime: { $first: "$dateTime" },
            engagement_data:{$first:"$engagement_data"},
            upvote_count: {
              $sum: {
                $cond: [{ $in: ["upvote", "$engagement_data.status"] }, 1, 0]
              }
            },
            downvote_count: {
              $sum: {
                $cond: [{ $in: ["downvote", "$engagement_data.status"] }, 1, 0]
              }
            }
                // $sum:1 
                // {
                  
                //   // $cond: [{ $eq: ["$engagement_data.status", "upvote"] }, 1, 0]
                // }
              // },
            // upvote_count: {
            //   $sum: {
            //     $cond: [{ $eq: ["$engagement_data.status", "upvote"] }, 1, 0]
            //   }
            // },
            // downvote_count: {
            //   $sum: {
            //     $cond: [{ $eq: ["$engagement_data.status", "downvote"] }, 1, 0]
            //   }
            // }
          }
        }
      ])
      .toArray();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    await closeConnection();
    return res.status(400).json(error);
  }
};
