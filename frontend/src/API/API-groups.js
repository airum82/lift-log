export const createExercise = (muscleGroup, name) => (
  fetch(`http://localhost:3000/api/bodyGroups/${muscleGroup}/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ name })
  })
    .then(res => res.json())
    .then(result => console.log(result))
    .catch(err => console.log(err))
)

export const fetchMuscleGroup = (group) => (
  fetch(`http://localhost:3000/api/bodyGroups/${group}`)
    .then(response => response.json())
    .catch(err => this.err = err)
)