const pool = require('../config/mysql')

const getPostByUserId = (req, res) => {
  const userId = req.params.userId;
  const query = "SELECT * FROM posts WHERE user_id=?;"

  pool.query(query, [userId], (err, results) => {
    if(err){
      return res.status(500).json(err)
    }

    if(results.length === 0){
      return res.status(404).json({message: "404 No posts found"})
    }
    res.status(200).json(results)
  })
}

const getAllPosts = (req, res) => {
  const query = 'SELECT * FROM posts';

  pool.query(query, (err, results) => {
    if(err){
      return res.status(500).json(err)
    }
    res.status(200).json(results)
  })
}

const createPost = (req, res) => {
  const {userId, title, body} = req.body;
  const query = 'INSERT INTO posts (user_id, title, body, publish_date) VALUES (?,?,?, CURRENT_TIMESTAMP);'
  if(!userId) {return res.status(400).json({message: "userId is required!"})}
  if(!title) {return res.status(400).json({message: "Title is required!"})}
  if(!body) {return res.status(400).json({message: "Body is required!"})}

  pool.query(query, [userId, title, body], (err) => {
    if(err){
      return res.status(500).json(err)
    }
    res.status(201).json({message: "Post successfully created"})
  })
}

const updatePost = (req, res) => {
  const {id, title, body} = req.body
  const query = `UPDATE posts
  SET
    title= COALESCE(?, title),
    body= COALESCE(?, body)
  WHERE id=?;`
  pool.query(query, [title, body, id], (err) => {
    if(err){
      return res.status(500).json(err)
    }
    res.status(200).json({message: "Post updated"})
  })
}

const deletePost = (req,res) => {
  const id = req.body.id
  const query = "DELETE FROM posts WHERE id=?";

  pool.query(query, [id], err => {
    if(err){
      return res.status(500).json(err)
    }
    res.status(200).json({message: "Post deleted!"})
  })
}

module.exports = {
  getPostByUserId,
  getAllPosts,
  createPost,
  updatePost,
  deletePost
}