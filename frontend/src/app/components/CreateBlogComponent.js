import React, { useState } from "react";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

// TipTap
import { TipTap } from './TipTap'; 

import styles from "../page.module.css";
import "../styles/CreateBlogComponent.css";
import "../styles/TipTap.css";

const CreateBlogComponent = () => {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false || !content) {
      event.stopPropagation();
    } else {
      // Form is valid, and there is content in the Tiptap editor.
      // You can proceed with submitting the form.
      // Use the `title` and `content` states to send data to your API or perform further actions.
    }
    
    setValidated(true);
  };

  return (
    <main className={styles.main}>
      <Container fluid>
        <h1 className="pgTitle">Create A Blog</h1>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="custom-form p-4"
        >
          <Row className="mb-3">
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

          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label className="custom-label">
                Body <span>*</span>
              </Form.Label>
              <br />
              <TipTap content={content} setContent={setContent} />
              <Form.Control.Feedback type="invalid">
                {content.trim() === '' ? "Content is required." : ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button type="submit" className="custom-button">
            Submit
          </Button>
        </Form>
      </Container>
    </main>
  );
};

export default CreateBlogComponent;
