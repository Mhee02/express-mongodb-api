// const express = require('express')
// const cors = require('cors')
// const app = express()
// const port = 3000

// app.use(cors())
// app.use(express.json())
 
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })

// const { MongoClient } = require("mongodb");
// const uri = "mongodb+srv://admin:1234@cluster0.x9ylhro.mongodb.net/";

// app.get('/users', async(req, res) => {
//     // const id = parseInt(req.params.id);
//     const client = new MongoClient(uri);
//     await client.connect();
//     const user = await client.db('mydb').collection('users').find({}).toArray();
//     await client.close();
//     res.status(200).send(user);
//   })
// app.get('/users/:year', async (req, res) => {
//     const year = parseInt(req.params.year);
//     const client = new MongoClient(uri);
//     try {
//         await client.connect();
//         const db = client.db('mydb');
//         const users = await db.collection('users').find({ "Year": year }).toArray();
//         if (users.length > 0) {
//             res.status(200).send({
//                 "status": "ok",
//                 "users": users
//             });
//         } else {
//             res.status(404).send({
//                 "status": "error",
//                 "message": "Users not found for the given year"
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({
//             "status": "error",
//             "message": "Internal server error"
//         });
//     } finally {
//         await client.close();
//     }
// });

const express = require('express');
const cors = require('cors');
const connectMongo = require('./mongoClient');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', async(req, res) => {
    try {
        const db = await connectMongo();
        const users = await db.collection('users').find({}).toArray();
        res.status(200).send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            "status": "error",
            "message": "Internal server error"
        });
    }
});

app.get('/users/:year', async (req, res) => {
    const year = parseInt(req.params.year);
    try {
        const db = await connectMongo();
        const users = await db.collection('users').find({ "Year": year }).toArray();
        if (users.length > 0) {
            res.status(200).send(users);
        } else {
            res.status(404).send({
                "status": "error",
                "message": "Users not found for the given year"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            "status": "error",
            "message": "Internal server error"
        });
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

