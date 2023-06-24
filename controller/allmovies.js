const movieCollection = require("../model/movies");
const { ObjectId } = require('mongodb');
const express = require('express');

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
    const movie = req.body
    const userEmail = req.user.email
    if (queryEmail !== userEmail) {
        return res.status(403).send({ message: 'Access Forbidden' })
    }
    const createMovie = await movieCollection.insertOne(movie);
    res.send(createMovie);
}
module.exports = { handleGetAllMovies, handleGetAllMoviesById, createMovie }