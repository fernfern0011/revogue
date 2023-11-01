'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '/styles/create_post_page.module.css';
import uploadProductButton from '../../../styles/Home.module.css'
import { CldUploadWidget } from 'next-cloudinary';

// MUI imports
import ImageIcon from '@mui/icons-material/Image';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Dropdown from '../components/Dropdown';
import Category from '../components/Category';

export default function CreatePost1() {
    const [selectedImage, setSelectedImage] = useState(null);
    const router = useRouter();
    const [imageUrls, setImageUrls] = useState([]);

    const handleDeleteImage = (index) => {
        setImageUrls(prevImageUrls => {
            const updateImageUrls = [...prevImageUrls]
            updateImageUrls.splice(index, 1)
            return updateImageUrls
        })
    }

    return (

        <main className={styles.main}>
            {/* container for image upload */}
            <div style={{ display: "flex", flexDirection: "column-reverse" }}>
                <div className="leftColumn">
                    <div>
                        <CldUploadWidget
                            uploadPreset="wad2_revogue"
                            options={{ folder: "product" }}
                            onUpload={(result) => {
                                const newImageUrl = result.info.secure_url;
                                setImageUrls(prevImageUrls => [...prevImageUrls, newImageUrl]);
                            }}>
                            {({ open }) => {
                                function handleOnClick(e) {
                                    e.preventDefault();
                                    open();
                                }
                                return (
                                    <button className={uploadProductButton.button} onClick={handleOnClick}>
                                        Upload Product image
                                    </button>
                                );
                            }}
                        </CldUploadWidget>
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
                                width: '25vw',
                            }, // Adjust the font size as needed
                        }}
                    />
                    <br />

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
                                width: '25vw'
                            }, // Adjust the font size as needed
                        }}
                    />
                    <br />

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
                            type='number'
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            inputProps={{
                                style: {
                                    fontSize: 13,
                                    height: '1px',
                                    width: '23vw'
                                }, // Adjust the font size as needed
                            }}
                        />
                    </FormControl>
                    <br />

                    {/* size */}
                    <Dropdown />

                    {/* Category */}
                    <Category />
                </div>
            </div>

            <br />
            <div style={{ display: "flex" }}>
                {imageUrls.map((imageUrl, index) => (
                    <div key={index} className="flex">
                        <img src={imageUrl} width={100} height={100}></img>
                        <p>{imageUrl}</p>
                        <button className='border-[1px] rounded-lg p-1 px-2 mt-5' onClick={() => handleDeleteImage(index)}>delete</button>
                    </div>
                ))}
            </div>
        </main>
    )
}