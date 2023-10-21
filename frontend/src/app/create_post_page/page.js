'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '/styles/create_post_page.module.css';
import Dropdown from '/src/app/components/Dropdown.js';

// MUI imports
import ImageIcon from '@mui/icons-material/Image';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

export default function CreatePost1() {
    const [selectedImage, setSelectedImage] = useState(null);
    const router = useRouter();

    const handleInputChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // You can perform additional checks here, like checking the file type and size
        setSelectedImage(URL.createObjectURL(file));
      }
    };
    
    //edit to route to the next page
    const handleNext = () => {
        // Pass the image data as a query parameter to the PreviewImage page
        router.push({
          pathname: '/create_post_page2/page',
          query: { image: selectedImage },
        });
      };

    return (
        
        <main className={styles.main}>

            {/* container for image upload */}
            <div className="leftColumn">
            <div className={styles.uploadImageContainer}>
                {selectedImage ? (
                    <div className={styles.uploadImage}>
                        <label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleInputChange}
                                hidden
                            />
                            <img src={selectedImage} alt="Uploaded" className={styles.imagePreview} />
                        </label>
                        <p className={styles.imageURL}>{selectedImage}</p>
                    </div>

                ) : (
                    <label className={styles.uploadImage}>
                        <div className={styles.uploadImageIcon}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleInputChange}
                            hidden
                        />
                        <ImageIcon className={styles.icon} />
                        <p>Upload Image</p>
                        </div>
                    </label>
                )}
            </div>
            </div>

            <div className="rightColumn">
            {/* product name */}
            <InputLabel
            className="label"
                htmlFor="standard-brandName"
                sx={{ textAlign: 'left', fontSize: 13, color: 'black' }}
            >
                Product Name <span style={{ color: 'red' }}>*</span>
            </InputLabel>
            <TextField
            required
            id="outlined-required"
            inputProps={{
                style: { 
                    fontSize: 13,
                    height: '1px',
                    width: '25vw', }, // Adjust the font size as needed
              }}
            />
            <br/>

            {/* description */}
            <InputLabel
            className="label"
                htmlFor="standard-brandName"
                sx={{ textAlign: 'left', fontSize: 13, color: 'black' }}
            >
                Description <span style={{ color: 'red' }}>*</span>
            </InputLabel>

            <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            inputProps={{
                style: { 
                    fontSize: 13,
                    width: '25vw' }, // Adjust the font size as needed
              }}
            />
            <br/>

            {/* Price */}
            <InputLabel
                className="label"
                htmlFor="standard-brandName"
                sx={{ textAlign: 'left', fontSize: 13, color: 'black' }}
            >
                Price <span style={{ color: 'red' }}>*</span>
            </InputLabel>
            <FormControl required>
            <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                inputProps={{
                    style: { 
                        fontSize: 13,
                        height: '1px',
                        width: '23vw' }, // Adjust the font size as needed
                  }}
            />
            </FormControl>
            <br/>

            {/* size */}
            
            <Dropdown />
            </div>


            <a className={styles.buttonCancel} style= {{ left: '25%' }} href='/page.js'>Cancel</a>
            <a onClick={handleNext} className={styles.buttonNext} style= {{ right: '25%' }} href='/create_post_page2'>Next</a>
        </main>
    )
}