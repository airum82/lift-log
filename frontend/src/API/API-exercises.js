export const fetchAllLogs = (uid) => (
  fetch(`http://localhost:3000/api/log/${uid}`)
    .then(response => response.json())
    .catch(err => console.log(err))
)