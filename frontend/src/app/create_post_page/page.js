'use client';
import React, { useEffect, useState } from 'react';
import styles from '/styles/create_post_page.module.css';
import Size from '../components/Size';
import Category from '../components/Category';
import ProductUpload from '../components/ProductUpload';

// MUI imports
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CreatePost1() {
    const [formData, setFormData] = useState({
        productname: '',
        description: '',
        price: 0,
        size: '',
        category: '',
        images: '',
        forwomen: false,
        formen: false
    })

    const handleChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleCheckbox = (e) => {
        e.preventDefault();

        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked
        })
    }

    const { formen, forwomen } = formData;
    const errorMessage = [formen, forwomen].filter((v) => v).length < 1;

    const [info, updateInfo] = useState();
    const [imageUrls, setImageUrls] = useState([])
    const handleImageChange = () => {
        const stringimages = JSON.stringify(imageUrls)
        console.log(stringimages);

        setFormData({
            ...formData,
            images: stringimages
        })
    }

    useEffect(() => {
        console.log(formData.images)
        console.log(formData)
    }, [formData])

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            images: imageUrls.toString(),
        }))
    }, [imageUrls])

    const createItem = async () => {
        handleImageChange()

        if (!errorMessage) {
            console.log(formData);
        }

        // try {
        //     const response = await axios.post('/api/addproduct', formData)
        //     router.push('/')
        //     console.log(response)
        // } catch (error) {
        //     console.log(error)
        // }
    }

    return (

        <main className={styles.main}>
            {/* container for image upload */}
            <div style={{ display: "flex", flexDirection: "column-reverse" }}>
                <div className="rightColumn">

                    <h1 style={{display: "flex", justifyContent:"center", fontSize:"25px", fontWeight:"bold", paddingTop:"30px", paddingBottom:"20px"}}>Upload New Item</h1>

                    {/* product name */}
                    <InputLabel
                        htmlFor="standard-brandName"
                        sx={{ textAlign: 'left', fontSize: 14, color: 'black', fontWeight: 'bold' }}
                    >
                        Product Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                        name='productname'
                        value={formData.productname}
                        onChange={handleChange}
                        inputProps={{
                            style: {
                                fontSize: 13,
                                height: '1px',
                                width: '25vw',
                                backgroundColor: '#F5F5F5',
                            },
                        }}
                        required
                    />
                    <br />

                    {/* description */}
                    <InputLabel
                        htmlFor="standard-brandName"
                        sx={{ textAlign: 'left', fontSize: 13, color: 'black' }}
                    >
                        Description <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                        id="outlined-multiline-static"
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
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
                        htmlFor="standard-brandName"
                        sx={{ textAlign: 'left', fontSize: 13, color: 'black' }}
                    >
                        Price <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <FormControl required>
                        <OutlinedInput
                            type='number'
                            id="outlined-adornment-amount"
                            name='price'
                            value={formData.price}
                            onChange={handleChange}
                            className={styles.label}
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

                    {/* Size */}
                    <Size setFormData={setFormData} />
                    <br />

                    {/* Category */}
                    <Category setFormData={setFormData} />

                    {/* Checkbox */}
                    <FormControl
                        required
                        error={errorMessage}
                        component="fieldset"
                        sx={{ m: 3 }}
                        variant="standard"
                    >
                        <FormLabel component="legend">At least one check</FormLabel>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} checked={formData.formen} name='formen' label="Male" onChange={handleCheckbox} />
                            <FormControlLabel control={<Checkbox />} checked={formData.forwomen} name='forwomen' label="Female" onChange={handleCheckbox} />
                        </FormGroup>
                    </FormControl>

                    <ProductUpload info={info} updateInfo={updateInfo} imageUrls={imageUrls} setImageUrls={setImageUrls} handleImageChange={handleImageChange} />


                    <button onClick={createItem} className='text-white mt-10 border-[1px] bg-purple-500 rounded-lg px-5 p-2'>Submit</button>
                </div>
                
            </div>
            
        </main>
    )
}