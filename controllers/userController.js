const pool = require('../config/mysql')

const getUserById = (req, res) => {
  const userId = req.params.id
  const query = 'SELECT * FROM users WHERE id=?'

  pool.query(query, [userId], (err, results) => {
    if(err){
      console.error(err);
      return res.status(500).json({error: 'Database error'})
    }

    if(results.length === 0){
      return res.status(404).json({message: "User not found"})
    }
    const user = results[0]
    return res.status(200).json(user)
  })
}

const getAllUsers = (req, res) => {
  const query = 'SELECT * FROM users'

  pool.query(query, (err, results) => {
    if(err){
      return res.status(500).json({error: 'Database error'})
    }

    if(results.length === 0 ){
      return res.status(404).json({message: "404 Not Found"})
    }
    return res.status(200).json(results)
  })
}

const createUser = (req, res) => {
  const {firstname, lastname, email, password, location, dept} = req.body
  const emailQuery = 'SELECT id FROM users WHERE email=?'
  
  pool.query(emailQuery, [email], (err, results) => {
    if(err){
      return res.status(500).json({error: 'Database error while validating Email'})
    }
    // console.log(results.length, results.length > 0)
    if(results.length > 0){
      //Email already taken
      return res.status(409).json({error: "Email already registered"})
    }else{
      // return res.status(200).json({message: "Email does not exists"})
      const query = "INSERT INTO users (first_name, last_name, email, password, location, dept, register_date) VALUES (?,?,?,?,?,?, CURRENT_TIMESTAMP)"
      pool.query(query, [firstname, lastname, email, password, location, dept], (err) => {
      if(err){
        res.status(500).json({error: 'Database error'})
      }
        getAllUsers(req, res)
      })
    }
  })
}

const updateUser = (req, res) => {
  const {firstname, lastname, email, password, location, dept, age, id} = req.body
  const query = `UPDATE users 
  SET 
    first_name= COALESCE(?,first_name),
    last_name=COALESCE(?,last_name),
    email=COALESCE(?,email),
    password=COALESCE(?,password),
    location=COALESCE(?,location),
    dept=COALESCE(?,dept),
    age=COALESCE(?,age)
  WHERE 
    id=?;`;
  pool.query(query, [firstname, lastname, email, password, location, dept, age, id], err => {
    if(err){
      return res.status(500).json({error: "Database error trying to udpate"})
    }
    return res.json({msg: "User updated!!!"})
  })
}

const deleteUser = (req, res) => {
  const {id} = req.body
  const query = "DELETE FROM users WHERE id=?;"
  console.log(id)
  pool.query(query, [id], err => {
    if(err){
      console.error(err);
      return res.status(500).json({error: "Database error: Cannot delete", err})
    }else{
      return res.json({message: "User deleted!"})
    }
  })
}

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
};