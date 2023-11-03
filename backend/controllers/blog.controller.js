const bodyParser = require('body-parser');
require('dotenv').config()
const postgre = require('../config/database')



const blogController = {

  createBlog : async (req, res) => {
    try {
      const { accid, title, content } = req.body;
  
      // Your SQL query to insert the blog post
      const query = "INSERT INTO blog(blogid, accid, title, content) VALUES(nextval('blog_id_seq'), $1, $2, $3) RETURNING blogid";
  
      // You should have a PostgreSQL pool or client instance set up earlier
      const {rows} = await postgre.query(query, [accid, title, content]);

      if (rows[0]) {
        const newBlogId = rows[0].blogid;
        return res.status(201).json({msg: 'Blog post created', blogId: newBlogId })
      }

      return res.status(500).json({ msg: 'Failed to create a blog post' });
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
    },    
    
}

module.exports = blogController;
