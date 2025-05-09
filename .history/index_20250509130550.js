const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Stapping, versione aggiornata basata su express.js (derivato da node js)')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})