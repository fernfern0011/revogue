import * as React from "react";
import Button from "@mui/material/Button";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.css";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import '../styles/Order.css'

const SalesCancelled = ({ saleItem }) => {

    const parsedOrderDetailsArray = saleItem.orderdetails.map((orderDetailString) => {
        try {
          return JSON.parse(orderDetailString);
        } catch (error) {
          console.error("Error parsing order details JSON:", error);
          return null; // You can return a default value or handle the error differently
        }
    });

  return (
    <Col xs="12" sm="6" md="4" className="px-2 pb-3">
      <Card style={{ width: "auto" }} className="card">
        <Card.Header>
            <Card.Text className="cardTop">
                <b>Order no: </b>{saleItem.orderid}<br/>
                <span className="cardTopText">
                <b>Order Date: </b>{saleItem.created_on}<br/>
                <b>Order Status: </b>{saleItem.iscompleted ? "Completed" : "Pending"}<br/>
                </span>
            </Card.Text>
        </Card.Header>
        <Card.Body>
            <Row>
                <Col>
                    <Card.Img src="/images/image7.png"/>
                </Col>
                <Col>
              {parsedOrderDetailsArray.map((parsedOrderDetails, index) => (
                <Card.Text key={index} className="cardText">
                  <b>{parsedOrderDetails.productname || "N/A"}</b> <br/>
                  <b>Qty: </b>{parsedOrderDetails.quantity || "N/A"}<br/>
                  <span className="cardTopText">Total: ${saleItem.totalprice}</span>
                </Card.Text>
              ))}
            </Col>
        </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SalesCancelled;
