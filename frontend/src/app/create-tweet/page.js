"use client"
import React, { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";

const CreateBlogComponent = () => {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data: session } = useSession();
  let accid = session ? session.id : '';
  const router = useRouter();

  useEffect(() => {
    if (session) {
      accid = session.id;
    } else {
      router.push('/error/403');
      return null;
    }
  }, [])

  const handleContentChange = (newContent) => {
    setContent(newContent)
  }

  const createBlogPost = async () => {
    try {
      const response = await axios.post(`https://revogue-backend.vercel.app/api/blog/create-blog`, {
        accid: accid,
        title: title,
        content: content,
      });

      if (response.status === 201) {
        console.log("Blog post created");
        console.log("Blog ID:", response.data.blogId);
        window.alert("Blog Created Successfully")
        router.push('/')
      } else {
        console.error("Failed to create a blog post");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const exportedTitle = title;
    const exportedContent = content;

    if (form.checkValidity() === false || !content) {
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <main className={styles.main}>
      <Container fluid>
        <div className="m-5">
          <h1 className="pgTitle fw-bold">Write your tweet</h1>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="custom-form p-4"
          >
            <Row className="mb-4">
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Control
                  type="text"
                  placeholder="Title of your tweet"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col} md="12" controlId="validationCustom02">
                {/* ... Body input ... */}
                <TipTap content={content} onContentChange={handleContentChange} />
                <Form.Control.Feedback type="invalid">
                  {content.trim() === "" ? "Content is required." : ""}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button type="submit" className="custom-button" onClick={createBlogPost}>
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </main>
  );
};

export default CreateBlogComponent;
