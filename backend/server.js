const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const groupRoutes = require('./group-routes');
const logRoutes = require('./log-routes');

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
app.post('/api/bodyGroups/new/:exercise', groupRoutes.createNewExercise)
//workout endpoints
app.get('/api/log/:date', logRoutes.fetchLog);
app.get('/api/log', logRoutes.fetchAllLogs);
app.post('/api/log/:date', logRoutes.createNewLog);
app.post('/api/log/:date/new', logRoutes.AddLift);
app.put('/api/log/:date', logRoutes.addSet);
app.delete('/api/log/:date', logRoutes.deleteLift);

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});