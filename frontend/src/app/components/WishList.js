import React, { useState } from 'react';
import WishlistItem from './WishListItem'
const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    { id: 1, name: 'Product 1', price: 19.99 },
    { id: 2, name: 'Product 2', price: 29.99 },
  ]);

  const handleDelete = (productId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
  };

  return (
    <div>
      <h2>My Wishlist</h2>
      {wishlist.map((product) => (
        <WishlistItem
          key={product.id}
          product={product}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Wishlist;
