const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://noormuhammadskipq:PKck0xcGsy4SNyWf@cluster0.jdu2idm.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri);

exports.getConnection=async()=>{
    try {
        (await client.connect());
        return client.db('Capstone');
    } catch (error) {
        console.log(error);
    }
};

exports.closeConnection=async()=>{
    await client.close();
}
