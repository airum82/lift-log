const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const groupRoutes = require('./group-routes');
const logRoutes = require('./log-routes');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Lift Log';

app.get('/', (req, res) => {
  res.send('Welcome Arram, shall we begin?')
});
//body group endpoints
app.get('/api/bodyGroups/:bodyGroup', groupRoutes.fetchWorkoutGroup)
app.post('/api/bodyGroups/:bodyGroup', groupRoutes.createNewGroup)
app.post('/api/bodyGroups/:group/new', groupRoutes.createNewExercise)
//workout endpoints
app.get('/api/log/:uid', logRoutes.fetchLogs);
app.post('/api/log/:date', logRoutes.createNewLog);
app.post('/api/log/:uid/:date', logRoutes.AddExercise);
app.post('/api/createUser', logRoutes.createUser);
app.put('/api/log/:uid/:date', logRoutes.addSet);
app.delete('/api/log/:date', logRoutes.deleteLift);

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});