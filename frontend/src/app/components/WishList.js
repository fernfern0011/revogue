import React, { useState } from 'react';
import WishlistItem from './WishListItem'
import '../styles/Wishlist.css';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    { id: 1, name: 'Product 1', price: 19.99 },
    { id: 2, name: 'Product 2', price: 29.99 },
  ]);

  const handleDelete = (productId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
  };

  return (
    <div className="main">
      <div className="breadcrumb">
        <p>
          Home &nbsp; {">"} &nbsp; <b>Wishlist</b>
        </p>
      </div>
      <h2>Wishlist</h2>
      {wishlist.map((product, index) => (
        <React.Fragment key={product.id}>
          <WishlistItem product={product} onDelete={handleDelete} />
          {index !== wishlist.length - 1 && <hr />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Wishlist;
