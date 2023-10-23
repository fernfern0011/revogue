import React from 'react';


const WishListItem = () => {
  return (
    <div
      style={{
        width: '90%', // Set the card width to 80% of the page
        padding: '20px',
        margin: '10px auto', // Center the card horizontally
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      <div style={{width:'3%', alignItems:'center', justifyContent:'center', marginTop:'40px', cursor:'pointer', color:'#807D7E'}}>X</div>
      <img
        style={{ width: 110, height: 110, borderRadius: 4 }}
        src="https://via.placeholder.com/110x110"
      />
      <div
        style={{
          marginLeft: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{color: '#3C4242', fontSize: 18, fontFamily: 'Lato', fontWeight: '700', letterSpacing: 0.36, wordWrap: 'break-word'}}>Blue Flower Print Crop Top </div>
        <div style={{display: 'flex', flexDirection:'row', marginTop:'10px'}}>
          <div>
            <span style={{ color: '#3C4242', fontSize: 16, fontFamily: 'Lato', fontWeight: '700', letterSpacing: 0.32, wordWrap: 'break-word'}}>
              Quantity:
            </span>
            <span style={{ color: '#3C4242', fontSize: 16, fontFamily: 'Lato', fontWeight: '700', letterSpacing: 0.32, wordWrap: 'break-word', marginLeft:'2px' }}>
              1
            </span>
          </div>
          <div style={{ color: '#807D7E', fontSize: 16, fontFamily: 'Lato', fontWeight: '700', letterSpacing: 0.32, wordWrap: 'break-word', marginLeft:'20px'}}>
            $29.00        
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
            borderRadius: 8,
            display: 'inline-flex',
            alignItems: 'center',
            padding: '12px',
            marginTop: '30px',
          }}
        >
          <div style={{ textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'Lato', fontWeight: '700', wordWrap: 'break-word' }}>
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishListItem;
