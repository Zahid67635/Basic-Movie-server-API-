const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gtp2h2a.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

function verifyJWT(req, res, next) {

    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).send('unauthorized access');
    }

    else {
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            req.user = user;
            next();
        });

    }
}

async function run() {
    try {
        const movieCollection = client.db('movie-server').collection('movies-series');
        const userCollection = client.db('movie-server').collection('userCollection');
        app.get('/all_movies', async (req, res) => {
            const query = {};
            const movies = await movieCollection.find(query).toArray();
            res.send(movies);
        });
        app.get('/all_movies/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) };
            const movie = await movieCollection.findOne(query);
            res.send(movie);
        });
        app.post('/all_movies', verifyJWT, async (req, res) => {
            const movie =
            {
                movie: "ABC",
                actors: [
                    "Actor A",
                    "Actor B",
                    "Actor C"
                ],
                crew: ["Director X", "Producer Y", "Writer Z"],
                runtime: '2 hr', rating: 8
            }
            const createMovie = await movieCollection.insertOne(movie);
            res.send(createMovie);
        });
        app.post('/login', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            if (user) {
                const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '1d' })
                res.cookie('jwt', token, { expires: new Date(Date.now() + 25892000000), httpOnly: true });
                return res.send({ accessToken: token });
            }
            res.status(403).send({ accessToken: '' })
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
