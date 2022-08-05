const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
const res = require('express/lib/response');
require('dotenv').config();

const app = express();
const port = 5000;


//
app.use(cors());
app.use(express.json());

// user = genius-car
// password = kZXlln1OfT5OJvtr

//mongodb func start-------------------------------------------------------->

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t392y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('carMechanic');
        const servicesCollection = database.collection('services');

        //get api
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })

        //get singing service

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            console.log('service Genius Server', id);
            const query = { _id: ObjectId(id) };
            const service = await servicesCollection.findOne(query);
            res.json(service);
        })

        //post api ------------------------------>
        app.post('/services', async (req, res) => {
            const service = req.body;
            console.log('Running vgsjvbuisdhyjvbsjvbiudhbudhj', service);
            const result = await servicesCollection.insertOne(service);
            console.log(result);
            res.json(result);
        });
    }
    finally {
        //await client.close();
    }
}

run().catch(console.dir);

//mongodb func end---------------------------------------------------------------->

//get app start------------------------------------------------------------------------>

app.get('/', (req, res) => {
    res.send('Running Genius Server');
});

app.listen(port, () => {
    console.log('Running Genius Server', port);
});


// get app end--------------------------------------------------------------------------------->