const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500;


app.use(cors(corsOptions))
//Custom middleware logger
app.use(logger)
//Built in Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')))
app.use('/subdir',express.static(path.join(__dirname, '/public')))

//Routes
app.use('/', require('./routes/root'))
app.use('/subdir', require('./routes/subdir'))
app.use('/employees', require('./routes/api/employees'))
app.use('/users', require('./routes/api/users'))
app.use('/posts', require('./routes/api/posts'))

app.all('*', (req, res) => {
  res.status(404)
  if(req.accepts('html')){
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  }else if(req.accepts('json')){
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