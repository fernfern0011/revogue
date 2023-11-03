"use client";
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/ItemPage.css';
import Button from '@mui/material/Button';

// mui imports
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ThriftingComponent from './ThriftingComponent';
import { useRouter } from 'next/navigation';

const ItemPage = ({ itemDetails }) => {
  const router = useRouter();
  console.log(itemDetails);

  var productid, productname, price, description, size, quantity, images;
  if (itemDetails) {
    var item = itemDetails;
    productid = item.productid;
    productname = item.productname;
    price = item.price;
    description = item.description;
    size = item.size;
    quantity = item.quantity;

    if (item.images) {
      const itemImages = item.images.split(',');
      images = itemImages;
    }
  }

  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    beforeChange: (current, next) => setCurrentSlide(next),
    prevArrow: <CustomPrevArrow />, // Replace with your custom up arrow component
    nextArrow: <CustomNextArrow />, // Replace with your custom down arrow component (make new function)

  };

  const thumbnails = [
    '../images/Raccoon.jpg',
    '../images/raccoon0.webp',
    '../images/raccoonStands.jfif'
  ]; // Replace with actual image paths

  function CustomPrevArrow(props) {
    return (
      <div className="custom-prev-arrow" onClick={props.onClick}>
        <KeyboardArrowUpIcon />
      </div>
    );
  }

  function CustomNextArrow(props) {
    return (
      <div className="custom-next-arrow" onClick={props.onClick}>
        <KeyboardArrowDownIcon />
      </div>
    );
  }

  const AddToCart = async () => {
    const addToCartRes = await fetch(`http://localhost:5000/api/cart/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accid: 9,
        productid: productid
      })
    }).catch(error => { console.log(error); });

    const status = addToCartRes.status;

    switch (status) {
      case 200:
        alert('Item is added to Cart')
        router.push('/add-to-cart');
        break;
      default:
        // setError(true);
        alert('Failed to add item to cart')
        // setSnackbar({ children: 'Teacher cannot be added', severity: 'error' });
        break;
    };

  }

  const AddToWishlist = async () => {
    const addToWishlistRes = await fetch(`http://localhost:5000/api/wishlist/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accid: 9,
        productid: productid
      })
    }).catch(error => { console.log(error); });

    const status = addToWishlistRes.status;

    switch (status) {
      case 200:
        alert('Item is added to wishlist')
        router.push('/wishlist');
        break;
      default:
        // setError(true);
        alert('Failed to add item to wishlist')
        // setSnackbar({ children: 'Teacher cannot be added', severity: 'error' });
        break;
    };
  }

  return (
    <>
      <div className="container">
        <div className="vertical-carousel-container">
          <div className="thumbnail-container">
            {/* if images valid, output real images else placeholder */}
            {images ? images.map((thumbnail, index) => (
              <div
                key={index}
                className={`thumbnail ${index === currentSlide ? 'active' : ''}`}
              >
                <img className="thumbnail" src={thumbnail} alt={`Thumbnail ${index + 1}`} />
              </div>
            )) : thumbnails.map((thumbnail, index) => (
              <div
                key={index}
                className={`thumbnail ${index === currentSlide ? 'active' : ''}`}
              >
                <img className="thumbnail" src={thumbnail} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className="carousel-left">
            <div className="carousel">
              <Slider {...settings}>
                {/* if images valid, output real images else placeholder */}
                {images ? images.map((thumbnail, index) => (
                  <div key={index}>
                    <img className="slide" src={thumbnail} alt={`Slide ${index + 1}`} />
                  </div>
                )) : thumbnails.map((thumbnail, index) => (
                  <div key={index}>
                    <img className="slide" src={thumbnail} alt={`Slide ${index + 1}`} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>

        <div className="other-content">
          {/* RIGHT SIDE */}
          <h1>{productname}</h1>

          <h1 className="price">{price}</h1>

          <p>{description}</p>

          <p className="size">Size: <span>{size}</span></p>
          <p className="quantity">Quantity: <span>{quantity}</span></p>

          <div className="buttons-container">
            <div className="cart-button">
              {/* <Link href={'/add-to-cart'}> */}
              <Button className="button" onClick={() => AddToCart()}>
                <ShoppingCartOutlinedIcon style={{ marginRight: "5px" }} />
                Add to Cart
              </Button>
              {/* </Link> */}
            </div>
            <div className="wishlist-button">
              {/* <Link href={'/wishlist'}> */}
              <Button className="wishlist" onClick={() => AddToWishlist()}>
                <FavoriteBorderIcon style={{ marginRight: "5px" }} />
                Add to Wishlist
              </Button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div >
      <ThriftingComponent text="Sustainability Impact" />
    </>
  );
};

export default ItemPage;