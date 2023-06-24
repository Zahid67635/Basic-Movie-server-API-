const client = require('../connection');
const movieCollection = client.db('movie-server').collection('movies-series');
module.exports = movieCollection