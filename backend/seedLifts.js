const MongoClient = require('mongodb').MongoClient;
const db = 'lift-log'

MongoClient.connect(`mongodb://localhost:27017/${db}`, (req, res) => {
  
})