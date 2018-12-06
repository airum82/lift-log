const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Lift Log';

app.get('/', (req, res) => {
  res.send('Welcome Arram, shall we begin?')
});

app.get('/api/bodyGroups/:bodyGroup', routes.fetchWorkoutGroup)
app.post('/api/bodyGroups/:bodyGroup', routes.createNewGroup)
app.post('/api/bodyGroups/new/:exercise', routes.createNewExercise)

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});