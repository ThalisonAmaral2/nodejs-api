const express = require('express');
const router = express.Router();
const path = require('path');


router.get('^/$|index(.html)?', (req, res) => {
  // res.sendFile('./views/index.html', {root: __dirname})
  res.sendFile(path.join(__dirname,'..' ,'views', 'index.html'))
})

router.get('/newpage(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..','views', 'newpage.html'))
})

router.get('/oldpage(.html)?', (req, res) => {
  res.status(301).redirect('/newpage'); //302 by default
})

module.exports = router;