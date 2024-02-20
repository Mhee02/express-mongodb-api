const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://admin:1234@cluster0.x9ylhro.mongodb.net/";
const client = new MongoClient(uri);

async function connectMongo() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db('mydb');
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

module.exports = connectMongo;
