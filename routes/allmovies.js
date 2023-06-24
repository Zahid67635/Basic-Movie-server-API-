const express = require('express');
const { verifyJWT } = require('../middleware/jwt');
const { handleGetAllMovies, handleGetAllMoviesById, createMovie } = require('../controller/allmovies');

const router = express.Router();
// all_movies
router.get('/', handleGetAllMovies);

router.get('/:id', handleGetAllMoviesById);

router.post('/', verifyJWT, createMovie);


module.exports = router;