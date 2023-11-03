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

const Purchase = ({ purchaseItem }) => {

    const router = useRouter()
    const [isCompleted, setIsCompleted] = useState(false)
    const parsedOrderDetailsArray = purchaseItem.orderdetails.map((orderDetailString) => {
        try {
          return JSON.parse(orderDetailString);
        } catch (error) {
          console.error("Error parsing order details JSON:", error);
          return null; // You can return a default value or handle the error differently
        }
    });

    const handleComplete = async () => {
      try {
        const response = await fetch(`https://revogue-backend.vercel.app/api/mypurchases/receive`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderid: purchaseItem.orderid,
            buyerid: purchaseItem.buyerid,
            sellerid: purchaseItem.sellerid,
          }),
        });
  
        if (response.ok) {
          setIsCompleted(true);
          // Wait for a short delay (e.g., 1000ms) before refreshing the page
          router.refresh();
        } else {
          console.error('Failed to receive the order');
        }
      } catch (error) {
        console.error('Error while receiving order:', error);
      }
    };

  return (
    <Col xs="12" sm="6" md="4" className="px-2 pb-3">
      <Card style={{ width: "auto" }} className="card">
        <Card.Header>
            <Card.Text className="cardTop">
                <b>Order no: </b>{purchaseItem.orderid}<br/>
                <span className="cardTopText">
                <b>Order Date: </b>{purchaseItem.created_on}<br/>
                <b>Order Status: </b>{purchaseItem.iscompleted ? "Completed" : "Pending"}<br/>
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
                  <span className="cardTopText">Total: ${purchaseItem.totalprice}</span>
                </Card.Text>
              ))}
            </Col>
        </Row>
        <div className="text-center">
            <Button variant="contained" className="custom-button mx-auto" onClick={handleComplete} disabled={isCompleted}>
                {isCompleted? 'Order Received' : 'Receive'}
            </Button>
        </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Purchase;
