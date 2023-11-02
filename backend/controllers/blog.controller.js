const bodyParser = require('body-parser');
require('dotenv').config()
const postgre = require('../config/database')


const blogController = {

  createBlog : async (req, res) => {
    try {
      const { authorId, title, content } = req.body;
  
      // Your SQL query to insert the blog post
      const query = 'INSERT INTO blog_posts (author_id, title, content, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id';
  
      // You should have a PostgreSQL pool or client instance set up earlier
      const result = await pool.query(query, [authorId, title, content]);
  
      if (result.rows.length > 0) {
        const newBlogId = result.rows[0].id;
        return res.status(201).json({ msg: 'Blog post created', blogId: newBlogId });
      } else {
        return res.status(500).json({ msg: 'Failed to create a blog post' });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
  ,
    
    getAll: async (req, res) => {
      try {
        // Query to fetch all blog posts
        const query = 'SELECT * FROM blog_posts';
    
        // You should have a PostgreSQL pool or client instance set up earlier
        postgre.query(query, (error, result) => {
          if (error) {
            return res.status(500).json({ msg: error.message });
          }
    
          const blogs = result.rows;
          return res.status(200).json(blogs);
        });
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }
    },

    getBlogsByUserId: async (req, res) => {
      try {
        const userId = req.params.userId; // Assuming you pass the user ID as a parameter
    
        // Query to fetch all blog posts by user ID
        const query = 'SELECT * FROM blog_posts WHERE author_id = $1';
    
        // You should have a PostgreSQL pool or client instance set up earlier
        postgre.query(query, [userId], (error, result) => {
          if (error) {
            return res.status(500).json({ msg: error.message });
          }
    
          const blogs = result.rows;
          return res.status(200).json(blogs);
        });
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }
    }
    
    
}

module.exports = blogController;
