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
  },
  AddLift: (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const date = req.params.date;
    const lift = req.body;
    mongoClient.connect(url, useNewUrlParser,
      (err, db) => {
        if (err) {
          console.log('There was an error: ', err);
        } else {
          const dbo = db.db(liftDb);
          dbo.collection(date).insertOne(lift, (err, result) => {
            if(err) throw err;
            console.log('new lift added!');
            db.close();
            return res.status(201).send(`${lift.name} was added!`)
          })
        }
      }
    )
  },
  addSet: (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    const { date }  = req.params;
    const {sets, name} = req.body;
    mongoClient.connect(url, (err, db) => {
      if(err) {
        console.log('There was an error: ', err);
      } else {
        const dbo = db.db(liftDb);
        dbo.collection(date).updateOne({ name },
          { $set: { name, sets } }, (err, result) => {
              if(err) throw err;
              console.log('success!');
              db.close();
              return res.status(201).send('new set was added!');
            }
        )
      }
    })
  },
  deleteLift: (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    const date = req.params.date;
    const doc = req.body;
    mongoClient.connect(url, (err, db) => {
      if(err) {
        console.log('There was an error: ', err);
      }
      const dbo = db.db(liftDb);
      dbo.collection(date).deleteOne(doc, (err, obj) => {
        if(err) throw err;
        console.log(`${doc.name} was deleted!`)
        db.close();
        return res.send(`${doc.name} was deleted!`)
      })
    })
  }
}