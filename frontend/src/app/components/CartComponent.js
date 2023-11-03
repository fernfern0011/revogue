import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "@mui/material/Button";

export default function CartComponent({ data, accid }) {

    const [thumbnail, setThumbnail] = useState('');

    useEffect(() => {
        if (data.images) {
            const firstImage = data.images.split(',');
            if (firstImage[0]) {
                setThumbnail(firstImage[0]);
            }
        }
    }, [data.images]);


    async function deleteCartItem(cartItemId) {
        try {
            const response = await fetch(
                `${process.env.backendUrl}/api/cart/delete?cartitemid=${data.cartItemId}&accid=${accid}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ cartitemid: cartItemId, accid: accid }),
                }
            );

            if (response.status === 201) {
                alert("Selected item has been deleted");
             
            } else {
                alert("Failed to delete the item");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            alert(error);
        }
    }

    return (
        <tr key={data.cartitemid}>
            <td></td>
            <td>
                <Row>
                    <Col xs="auto">
                        <img
                            src={thumbnail ? thumbnail : '/images/image5.png'}
                            alt=""
                            width="150"
                            height="150"
                            className="image"
                        />
                    </Col>
                    <Col>
                        <p>{data.productname}</p>
                        <p className="small">Size: {data.size}</p>
                    </Col>
                </Row>
            </td>
            <td className="custom-td">${data.price}</td>
            <td className="custom-td">1</td>
            <td className="custom-td">${data.price}</td>
            <td>
                <Button onClick={(e) => deleteCartItem(data.cartitemid)}>
                    Delete
                </Button>
            </td>
        </tr>
    )

}

