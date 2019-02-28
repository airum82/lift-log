export const findCurrentLog = (results, date) => {
  return results.find(workout => {
    console.log('resuls:',results)
    return date === workout.date;
  })
}