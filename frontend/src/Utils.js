export const findCurrentLog = (results, date) => (
  results.find(workout => {
    return date === workout.date;
  })
)

export const modifyLifts = (lifts, name, weight, reps) => (
  lifts.map(lift => {
    if (lift.name === name) {
      return {
        name,
        sets: [
          ...lift.sets, {
            weight,
            reps
          }
        ]
      }
    }
    return lift
  })
)