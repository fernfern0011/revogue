import React, { useState, useEffect } from 'react';
import WishlistItem from './WishListItem';
import '../styles/Wishlist.css';
import { useSession } from 'next-auth/react';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);

  const { data: session, status } = useSession(); // Use the status

  useEffect(() => {
    if (status === "authenticated") { // Check if the session is authenticated
      const accID = session.id;
      console.log(accID);

      const fetchData = () => {
        fetch(`http://localhost:5000/api/wishlist/get-all-wishlists?accid=${accID}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Error fetching wishlist data');
            }
            return response.json();
          })
          .then((data) => {
            setWishlist(data.data);
          })
          .catch((err) => {
            setError(err);
          });
      };

      fetchData();
    }
  }, [session, status]);

  const handleDelete = (productId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="main">
      <div className="breadcrumb">
        <p>
          Home &nbsp; {'>'} &nbsp; <b>Wishlist</b>
        </p>
      </div>
      <h2>Wishlist</h2>
      {error ? (
        <p>Error: {error.message}</p>
      ) : (
        wishlist.map((product, index) => (
          <React.Fragment key={product.id}>
            <WishlistItem product={product} onDelete={() => handleDelete(product.id)} />
            {index !== wishlist.length - 1 && <hr />}
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default Wishlist;
