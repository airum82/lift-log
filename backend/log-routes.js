const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017/'
const liftDb = 'liftLog';
const useNewUrlParser = { useNewUrlParser: true };

module.exports = {
  createUser: (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const { uid } = req.body;
    mongoClient.connect(url, useNewUrlParser,
      (err, db) => {
        if(err) {
          console.log('there was an error')
        } else {
          const dbo = db.db(liftDb);
          dbo.createCollection(uid, (err, result) => {
            if(err) throw err;
            db.close();
            return res.status(200).json('new user created!')
          })
        }
      })
  },
  fetchLogs: (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const { uid } = req.params;
    console.log(uid)
    mongoClient.connect(url, useNewUrlParser,
      (err, db) => {
        if(err) {
          console.log('there was an error:', err);
        } else {
          const dbo = db.db(liftDb);
          dbo.collection(uid).find({}).toArray((err, result) => {
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
    const date = req.params.date;
    const { uid } = req.body;
    mongoClient.connect(url, useNewUrlParser,
      (err, db) => {
        if(err) {
          console.log('there was an error:', err);
        } else {
          const dbo = db.db(liftDb);
          dbo.collection(uid).insertOne({ date }, (err, result) => {
            if(err) throw err;
            console.log('new log added')
            db.close();
            return res.status(200).json('new log added for' + uid)
          })
        }
      }
    )
  },
  AddExercise: (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const { date, uid } = req.params;
    const exercises = req.body;
    mongoClient.connect(url, useNewUrlParser,
      (err, db) => {
        if (err) {
          console.log('There was an error: ', err);
        } else {
          const dbo = db.db(liftDb);
          dbo.collection(uid).updateOne({ date }, { $set: { exercises } }, (err, result) => {
            if(err) throw err;
            console.log('new lift added!');
            db.close();
            return res.status(201).json('new exercises was added')
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