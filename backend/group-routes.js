const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017/'
const bodyGroupsDb = 'bodyGroups';

module.exports = {
  checkForDuplicates: (dbo, collection, name) => {
    return dbo.collection(collection).findOne({ name: name })
  },
  fetchWorkoutGroup: (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    mongoClient.connect(url, async (err, db) => {
      if(err) {
        console.log('there was an error:', err);
      } else {
        const dbo = db.db(bodyGroupsDb);
        dbo.collection(req.params.bodyGroup).find({}).toArray((err, result) => {
          if(err) throw err;
          db.close()
          return res.status(200).json(result)
        })
      }
    })
  },
  createNewGroup: (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const newGroup = req.params.bodyGroup;
    mongoClient.connect(url, (err, db) => {
      if (err) throw err;
      const dbo = db.db(bodyGroupsDb);
      dbo.createCollection(newGroup, (err, response) => {
        if (err) throw err;
        console.log(`${newGroup} collection was created!`);
        res.status(201).json(`${newGroup} was created!`)
        db.close();
      })
    })
  },
  createNewExercise: (req, res) => {
    const newExercise = req.body;
    console.log(newExercise);
    const confirmation = `${newExercise.name} was added!`
    res.header('Access-Control-Allow-Origin', '*');
    mongoClient.connect(url, async (err, db) => {
      if (err) throw err;
      const dbo = db.db(bodyGroupsDb);
      if (await checkForDuplicates(dbo, req.params.exercise, newExercise.name)) {
        return res.status(402).send('It already exists')
      }
      dbo.collection(req.params.group).insertOne(newExercise, (err, res) => {
        if (err) throw err;
        console.log(confirmation);
        db.close();
        return res.status(201).json(confirmation)
      })
    })
  }
}