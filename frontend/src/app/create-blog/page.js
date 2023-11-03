"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useSession } from 'next-auth/react';
import { TipTap } from "./TipTap";
import styles from "../page.module.css";
import "../styles/TipTap.css";
import "../styles/CreateBlogComponent.css";
import axios from "axios";


const CreateBlogComponent = () => {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const {data: session} = useSession();
  let accid;
  if (session){
    accid = session.id;
    console.log(accid);
  }

  const handleContentChange = (newContent) => {
    setContent(newContent)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const exportedTitle = title;
    const exportedContent = content;
    console.log(title)
    console.log(content)

    if (form.checkValidity() === false || !content) {
      event.stopPropagation();
    } else {
      // Form is valid, and there is content in the Tiptap editor.
      // You can proceed with submitting the form.
      try {
        // Make an HTTP POST request to create the blog post
        const response = await axios.post('http://localhost:5000/api/blog/create-blog', {
          accid: accid,
          title: title,
          content: content,
        });

        // Check the response and handle accordingly
        if (response.status === 201) {
          console.log("Blog post created");
          console.log("Blog ID:", response.data.blogId);
        } else {
          console.error("Failed to create a blog post");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    setValidated(true);
  };


  return (
    <main className={styles.main}>
      <Container fluid>
        <div className="m-5">
          <h1 className="pgTitle fw-bold">Create A Blog</h1>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="custom-form p-4"
          >
            <Row className="mb-4">
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label className="custom-label">
                  Title <span>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title of your blog"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Title is required.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col} md="12" controlId="validationCustom02">
                <Form.Label className="custom-label">
                  Body <span>*</span>
                </Form.Label>
                <br />
                <TipTap content={content} onContentChange={handleContentChange} />
                <Form.Control.Feedback type="invalid">
                  {content.trim() === "" ? "Content is required." : ""}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button type="submit" className="custom-button">
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </main>
  );
};

export default CreateBlogComponent;
