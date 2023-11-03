import * as React from "react";
import Button from "@mui/material/Button";

//bootstrap imports
import "bootstrap/dist/css/bootstrap.css";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import '../styles/Order.css'
import { useState } from "react";
import { useRouter } from "next/navigation";

const SalesConfirmation = ({ saleItem }) => {

    const router = useRouter();
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);

    const parsedOrderDetailsArray = saleItem.orderdetails.map((orderDetailString) => {
        try {
          return JSON.parse(orderDetailString);
        } catch (error) {
          console.error("Error parsing order details JSON:", error);
          return null; // You can return a default value or handle the error differently
        }
    });

    const handleConfirm = async () => {
      try {
        const response = await fetch(`https://revogue-backend.vercel.app/api/mysales/confirm`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderid: saleItem.orderid,
            buyerid: saleItem.buyerid,
            sellerid: saleItem.sellerid,
          }),
        });
  
        if (response.ok) {
          setIsConfirmed(true);
          // Wait for a short delay (e.g., 1000ms) before refreshing the page
          alert("Sale is Confirmed!")
        } else {
          console.error('Failed to confirm the order');
        }
      } catch (error) {
        console.error('Error while confirming order:', error);
      }
    };

    const handleCancel = async () => {
      try {
        const response = await fetch(`https://revogue-backend.vercel.app/api/mysales/cancel`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderid: saleItem.orderid,
            buyerid: saleItem.buyerid,
            sellerid: saleItem.sellerid,
          }),
        });
  
        if (response.ok) {
          setIsCancelled(true);
          // Wait for a short delay (e.g., 1000ms) before refreshing the page
          alert("Sale is Cancelled!")
        } else {
          console.error('Failed to cancel the order');
        }
      } catch (error) {
        console.error('Error while cancelling order:', error);
      }
    };

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
        <div className="text-center">
            <Button variant="contained" className="custom-confirm-button mx-2" onClick={handleConfirm} disabled={isConfirmed}>
            Confirm
            </Button>
            <Button variant="contained" className="custom-cancel-button mx-2" onClick={handleCancel} disabled={isCancelled}>
            Cancel
            </Button>
        </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SalesConfirmation;
