export const fetchAllLogs = (uid) => (
  fetch(`http://localhost:3000/api/log/${uid}`)
    .then(response => response.json())
    .catch(err => console.log(err))
)

export const modifyLifts = (uid, date, lifts) => (
  fetch(`http://localhost:3000/api/log/${uid}/${date}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(lifts)
  })
    .then(res => res.json())
    .then(result => console.log(result))
    .catch(err => console.log(err))
)

export const createNewLog = (date, uid) => (
  fetch(`http://localhost:3000/api/log/${date}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ uid })
  })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(err => console.log(err))
)

export const createUser = uid => (
  fetch('http://localhost:3000/api/createUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uid
    })
  })
    .then(res => res.json())
    .then(result => console.log(result))
    .catch(err => console.log(err))
)