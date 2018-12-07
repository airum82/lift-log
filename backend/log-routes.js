const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017/'
const liftDb = 'liftLog';
const useNewUrlParser = { useNewUrlParser: true };

module.exports = {
  fetchLog: (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const date = req.params.date;
    mongoClient.connect(url, useNewUrlParser,
      (err, db) => {
        if(err) {
          console.log('there was an error:', err);
        } else {
          const dbo = db.db(liftDb);
          dbo.collection(date).find({}).toArray((err, result) => {
            if(err) throw err;
            db.close();
            return res.status(200).json(result)
          })
        }
      }
    )
  },
  createNewLog: (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const date = req.params.date
    mongoClient.connect(url, useNewUrlParser,
      (err, db) => {
        if(err) {
          console.log('there was an error:', err);
        } else {
          const dbo = db.db(liftDb);
          dbo.createCollection(date, (err, result) => {
            if(err) throw err;
            console.log('collection created');
            db.close();
            return res.status(201).send('new log created!')
          })
        }
      }
    )
  },
  fetchAllLogs: (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    mongoClient.connect(url, useNewUrlParser,
      (err, db) => {
        if(err) {
          console.log('there was an error: ', err)
        }
        else {
          const dbo = db.db(liftDb);
          dbo.listCollections().toArray((err, result) => {
            if(err) throw err;
            db.close()
            return res.status(200).json(result);
          })
        }
      }
    )
  }
}