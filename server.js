const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
})

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'db/db.json'))
})

app.post('/api/notes', (req, res) => {
  console.log('save btn clicked')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})