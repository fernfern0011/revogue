"use client"
import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';

function BlogCards() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch the data from the API
    fetch(`${process.env.backendUrl}/api/blog/get-all-blogs`)
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const getRandomColor = () => {
    const colors = ['Primary', 'Secondary', 'Success', 'Danger', 'Warning', 'Info', 'Dark'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
  };

  return (
    <div className="blog-grid">
      {blogs.map((blog) => (
        <Card
          bg={getRandomColor().toLowerCase()}
          key={blog.blogid}
          text={getRandomColor().toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '18rem' }}
          className="mb-2"
        >
          <Card.Body>
            <Card.Title>{blog.title}</Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
          <Card.Header>{`Account ID: ${blog.accid}`}</Card.Header>
        </Card>
      ))}
      <style jsx>{`
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
          grid-gap: 1rem;
        }
      `}</style>
    </div>
  );
}

export default BlogCards;
