/* global axios */

axios.get('/api/status')
  .then(res => {
    console.log(res.data)
  })
  .catch(err => {
    console.log(err)
  })
