const express = require('express');
const router = express.Router();
const data = {}
data.employees = require('../../data/employees.json');

router.route('/')
  .get((req, res) => {
    res.json(data.employees)
  })
  .post((req, res) => {
    res.json({
      "firstname": req.body.firstname,
      "lastname": req.body.lastname
    });
  })
  .put((req, res) => {
    res.json({
      "firstname": req.body.firstname,
      "lastname": req.body.lastname
    });
  })
  .delete((req, res) => {
    res.json({"id": req.body.id})
  });

router.route('/:id')
  .get((req, res) => {
    let foundEmployee = data.employees.find(employee => {
      return employee.id == req.params.id
    })
    if(foundEmployee){
      res.status(200).json(foundEmployee);
    }else{
      res.status(404).json({"message":"404 Not Found"})
    }
  });

module.exports = router;