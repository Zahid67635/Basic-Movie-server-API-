const movieCollection = require("../model/movies");
const { ObjectId } = require('mongodb');

const handleGetAllMovies = async (req, res) => {
    const query = {};
    const movies = await movieCollection.find(query).toArray();
    res.send(movies);
}
const handleGetAllMoviesById = async (req, res) => {
    const id = req.params.id
    const query = { _id: new ObjectId(id) };
    const movie = await movieCollection.findOne(query);
    res.send(movie);
}
const createMovie = async (req, res) => {
    const queryEmail = req.query.email
    const body = req.body
    if (!body || !body.movie || body.runtime || !body.actors || !body.crew || !body.rating) {
        return res.status(400).send({ message: 'All fields required' })
    }
    const userEmail = req.user.email
    if (queryEmail !== userEmail) {
        return res.status(403).send({ message: 'Access Forbidden' })
    }
    const createMovie = await movieCollection.insertOne(body);
    res.send(createMovie);
}
module.exports = { handleGetAllMovies, handleGetAllMoviesById, createMovie }