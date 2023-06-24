const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const moviesRouter = require('./routes/allmovies');
const loginRouter = require('./routes/login');
const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());
app.use(cookieParser());


async function run() {
    try {
        app.use('/all_movies', moviesRouter);
        app.use('/login', loginRouter);


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
