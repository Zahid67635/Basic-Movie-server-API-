const client = require('../connection');
const userCollection = client.db('movie-server').collection('userCollection');

module.exports = userCollection
