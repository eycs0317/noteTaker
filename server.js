const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');


app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  let newNote = req.body;
  newNote.id = uuidv4()

  fs.readFile(path.join(__dirname,'db/db.json'),'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    let dataArr = JSON.parse(data)
    dataArr.push(newNote)

    fs.writeFile(path.join(__dirname,'db/db.json'), JSON.stringify(dataArr), (err) => {
      (err) ? console.log(err) : console.log('success!!')
    } )
  })
    res.send('Save Note')
})

  app.delete('/api/notes/:id',(req, res) => {
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
      if(err) {
        console.error(err)
        return;
      }
      // console.log('data', data)
      let dataDel = JSON.parse(data)
      let id = req.params.id
      let filtedArr = dataDel.filter(item => {
        return item.id !== id
      })
      fs.writeFile(path.join(__dirname,'db/db.json'), JSON.stringify(filtedArr), (err) => {
        (err) ? console.log(err) : console.log('success!!')
      } )
    })
    res.send('delete sucess!!')
  })

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})