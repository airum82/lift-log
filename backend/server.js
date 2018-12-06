const express = require('express');
const app = express();
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017/';
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Lift Log';

const checkForDuplicates = (dbo, collection, name) => {
  return dbo.collection(collection).findOne({ name: name })
}

app.get('/', (req, res) => {
  res.send('Welcome Arram, shall we begin?')
});

app.get('/api/bodyGroups/:bodyGroup', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  mongoClient.connect(url, async (err, db) => {
    if(err) {
      console.log('there was an error:', err);
    } else {
      const dbo = db.db('bodyGroups');
      dbo.collection(req.params.bodyGroup).find({}).toArray((err, result) => {
        if(err) throw err;
        db.close()
        return res.status(200).json(result)
      })
    }
  })
})

app.post('/api/bodyGroups/:group', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db('bodyGroups');
    dbo.createCollection(req.params.group, (err, response) => {
      if (err) throw err;
      console.log(`${req.params.group} collection was created!`);
      res.status(201).json(`${req.params.group} was created!`)
      db.close();
    })
  })
})

app.post('/api/bodyGroups/new/:group', (req, res) => {
  const newExercise = req.body;
  console.log(newExercise);
  const confirmation = `${newExercise.name} was added!`
  res.header('Access-Control-Allow-Origin', '*');
  mongoClient.connect(url, async (err, db) => {
    if (err) throw err;
    const dbo = db.db('bodyGroups');
    if (await checkForDuplicates(dbo, req.params.group, newExercise.name)) {
      return res.status(402).send('It already exists')
    }
    dbo.collection(req.params.group).insertOne(newExercise, (err, res) => {
      if (err) throw err;
      console.log(confirmation);
      db.close();
      return res.status(201).json(confirmation)
    })
  })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});