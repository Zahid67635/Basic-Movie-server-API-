const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gtp2h2a.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const movieCollection = client.db('movie-server').collection('movies-series');
        app.get('/all_movies', async (req, res) => {
            const query = {};
            const movies = await movieCollection.find(query).toArray();
            res.send(movies);
        });

    } finally {


    }
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('My movie server is running')
})

app.listen(port, () => {
    console.log(`Movie server running on ${port}`);
})