const data = {}
data.employees = require('../model/employees.json');

const getAllEmployees = (req, res) => {
  res.json(data.employees)
}

const createEmployee = (req, res) => {
  const newId = data.employees.length
  const newEmployee = {
    id: newId,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  }
  data.employees.push(newEmployee)
  res.json(newEmployee);
}

const updateEmployee = (req, res) => {
  const id = req.body.id;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const foundIndex = data.employees.findIndex(employee => employee.id == id)

  //Update with the data that isn't undefined
  const currentEmployee = data.employees[foundIndex];
  currentEmployee.firstname = firstname ? firstname : currentEmployee.firstname
  currentEmployee.lastname = lastname ? lastname : currentEmployee.lastname
  data.employees[foundIndex] = currentEmployee

  res.json(currentEmployee);
}

const deleteEmployee = (req, res) => {
  res.json({"id": req.body.id})
}

const getEmployee = (req, res) => {
  let foundEmployee = data.employees.find(employee => {
    return employee.id == req.params.id
  })
  if(foundEmployee){
    res.status(200).json(foundEmployee);
  }else{
    res.status(404).json({"message":"404 Not Found"})
  }
}

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee
}