import React from 'react';
import { useState, useEffect } from 'react';

const WishListItem = ({ product, onDelete }) => {

  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    if (product.images) {
      const firstImage = product.images.split(',');

      if (firstImage[0]) {
        setThumbnail(firstImage[0]);
      }
    }
  }, [product.images]);


  return (
    <div
      style={{
        width: '90%',
        padding: '10px',
        margin: '10px auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '3%',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#807D7E',
          marginRight: '20px',
        }}
      >
        ✖
      </div>
      <img
        style={{ width: 110, height: 120, borderRadius: 4 }}
        src={thumbnail}
        alt={product.productname}
      />
      <div
        style={{
          marginLeft: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            color: '#3C4242',
            fontSize: 15,
            fontFamily: 'Lato',
            fontWeight: '700',
            letterSpacing: 0.36,
            wordWrap: 'break-word',
          }}
        >
          {product.productname}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
          <div>
            <span
              style={{
                color: '#3C4242',
                fontSize: 14,
                fontFamily: 'Lato',
                fontWeight: '700',
                letterSpacing: 0.32,
                wordWrap: 'break-word',
              }}
            >
              Quantity:
            </span>
            <span
              style={{
                color: '#3C4242',
                fontSize: 14,
                fontFamily: 'Lato',
                fontWeight: '500',
                letterSpacing: 0.32,
                wordWrap: 'break-word',
                marginLeft: '2px',
              }}
            >
              {product.quantity}
            </span>
          </div>
          <div
            style={{
              color: '#807D7E',
              fontSize: 14,
              fontFamily: 'Lato',
              fontWeight: '500',
              letterSpacing: 0.32,
              wordWrap: 'break-word',
              marginLeft: '20px',
              marginTop: '1px',
            }}
          >
            ${product.price}
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: 'auto',
        }}
      >
        <div
          style={{
            background: '#17B5B5',
            borderRadius: 5,
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 15px',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 13,
              fontFamily: 'Lato',
              wordWrap: 'break-word',
            }}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishListItem;
