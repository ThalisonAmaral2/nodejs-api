const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500;

const whitelist = ['https://www.google.com', 'http://127.0.0.1:5500']
const corsOptions = {
  origin: (origin, callback) => {
    if(whitelist.indexOf(origin) !== -1 || !origin){
      callback(null, true);
    }else{
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
//Custom middleware logger
app.use(logger)

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
  // res.sendFile('./views/index.html', {root: __dirname})
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/newpage(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'newpage.html'))
})

app.get('/oldpage(.html)?', (req, res) => {
  res.status(301).redirect('/newpage');
})

app.all('*', (req, res) => {
  res.status(404)
  if(req.accepts('html')){
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  }
  if(req.accepts('json')){
    res.json({error: '404 Not Found'})
  }else{
    res.type('txt').send("404 Not Found")
  }
})

//Handling errors

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `)
})