
import * as React from "react";
import Button from "@mui/material/Button";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.css";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import '../styles/Order.css'

const Order = () => {
  return (
    <Col xs="12" sm="6" md="4" className="px-2 pb-3">
      <Card style={{ width: "auto" }} className="card">
        <Card.Header>
            <Card.Text className="cardTop">
                <b>Order no: #123456789</b> <br/>
                <span className="cardTopText">
                <b>Order Date: </b>12/12/2021 12:40 PM<br/>
                <b>Order Status: </b>Completed<br/>
                </span>
            </Card.Text>
        </Card.Header>
        <Card.Body>
            <Row>
                <Col>
                    <Card.Img src="/images/image7.png"/>
                </Col>
            <Col>
            <Card.Text className="cardText">
                <b>Floral Printed T-shirt</b> <br/>
                <b>Qty: </b> 1 <br/>
                <span className="cardTopText">Total: $24.00</span>
            </Card.Text>
            </Col>
        </Row>
        <div className="text-center">
            <Button variant="contained" className="custom-button mx-auto">
            Order Received
            </Button>
        </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Order;
