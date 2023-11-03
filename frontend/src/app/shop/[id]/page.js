"use client"
import ItemPage from '@/app/components/ItemPage';
import { useEffect, useState } from "react";
import { Container, Row } from 'react-bootstrap';

function ProductPage(context) {
    const { id } = context.params;
    const [error, setError] = useState(null);
    const [itemData, setItemData] = useState([]);

    useEffect(() => {
        fetch(`${process.env.backendUrl}/api/product?productid=${id}`, {
            headers: { "Content-Type": "application/json" }
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Error fetching product information');
            }
            return response.json();
        }).then((responseData) => {
            const itemList = responseData.data;
            if (!Array.isArray(itemList) || itemList.length === 0) {
                throw new Error('Fail to get product details');
            }
            setItemData(itemList);
        }).catch((error) => {
            setError(error);
        });
    }, [])

    const items = itemData.map((item, index) => (
        <ItemPage key={index} itemDetails={item} />
    ));


    return (
        <Container className="test">
            {error ? (
                <div className='error-box'>
                    <h1>No Pending Orders</h1>
                </div>
            ) : (
                <Row>{items}</Row>
            )}
        </Container>
    )
}

export default ProductPage;