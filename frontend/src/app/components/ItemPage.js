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


const VerticalCarousel = () => {

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


  return (

    <div className="container">

    <div className="vertical-carousel-container">
      <div className="thumbnail-container">
        {thumbnails.map((thumbnail, index) => (
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
            {thumbnails.map((thumbnail, index) => (
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
      <h1>Raven Hoodie With Black Colored Design</h1>

      <h1 className="price">S$19.99</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

      <p className="size">Size: <span>Free Size</span></p>

     
      <div className="buttons-container">
      <div className="cart-button">
        <Button className="button">
          <ShoppingCartOutlinedIcon style={{marginRight: "5px"}}/>
          Add to Cart
        </Button>
      </div>
      <div className="wishlist-button">
        <Button className="wishlist">
          <FavoriteBorderIcon style={{marginRight: "5px"}}/>
          Add to Wishlist
        </Button>
      </div>
    </div>

    <Button
      className="profile"
    >
      <img src="../images/Raccoon.jpg" className="profile-image" /> 
      Some Name
    </Button>
      
    </div>

  </div>
  );
};

export default VerticalCarousel;