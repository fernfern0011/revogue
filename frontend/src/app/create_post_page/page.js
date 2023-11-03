'use client';
import React, { useEffect, useState } from 'react';
import styles from '/styles/create_post_page.module.css';
import Size from '../components/Size';
import Category from '../components/Category';
import { CldUploadWidget } from 'next-cloudinary';

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
import { useRouter } from 'next/navigation';
import DeleteIcon from '@mui/icons-material/Delete';


function CreatePost() {
    const router = useRouter();

    const refreshData = () => {
        router.refresh();
    };

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

    // const [info, updateInfo] = useState()
    const [imageUrls, setImageUrls] = useState([])
    const handleImageChange = () => {
        const stringimages = JSON.stringify(imageUrls)
        setFormData({
            ...formData,
            images: stringimages
        })
    }

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            images: imageUrls.toString(),
        }))
    }, [imageUrls])

    const onupload = (result) => {
        // updateInfo(result.info.secure_url);
        const newImageUrl = result.info.secure_url
        const newImagePublicId = result.info.public_id;
        setImageUrls(preImageUrls => [...preImageUrls, newImageUrl])
        // setPublicId(prevImagePublicId => [...prevImagePublicId, newImagePublicId])
        handleImageChange(result)
    }

    const handleDeleteImage = async (index) => {
        var updateImage = imageUrls;
        updateImage.splice(index, 1)
        setImageUrls(updateImage);

        // refresh page to show updated imagelist
        refreshData()
    }

    const createItem = async () => {
        handleImageChange()

        if (!errorMessage) {
            const itemData = formData;

            const createItemRes = await fetch(`https://revogue-backend.vercel.app/api/product/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    accid: 9,
                    productname: itemData.productname,
                    description: itemData.description,
                    price: itemData.price,
                    size: itemData.size,
                    category: itemData.category,
                    forwomen: itemData.forwomen,
                    formen: itemData.formen,
                    images: itemData.images
                })
            }).catch(error => { console.log(error); });

            const status = createItemRes.status;

            switch (status) {
                case 201:
                    alert('Item is created')
                    router.push('/shop');
                    break;
                default:
                    // setError(true);
                    alert('Failed to create an item')
                    // setSnackbar({ children: 'Teacher cannot be added', severity: 'error' });
                    break;
            };
        }
    }

    return (

        <main className={styles.main}>
            
            <div className="container">
                <h1 style={{ display: "flex", justifyContent: "center", fontSize: "25px", fontWeight: "bold", paddingTop: "40px", paddingBottom: "30px" }}>Upload New Item</h1>
                
                <div className="center row">
                    <div className="col-sm-6 d-flex justify-content-center flex-column">
                    <div className="d-flex flex-column align-items-center">
                        <div className="mb-3">
                        <InputLabel
                            htmlFor="standard-brandName"
                            sx={{ textAlign: 'left', fontSize: 15, color: 'black', fontWeight: 'bold' }}
                        >
                            Product Name <span style={{ color: 'red' }}>*</span>
                        </InputLabel>
                        <TextField
                            name='productname'
                            value={formData.productname}
                            onChange={handleChange}
                            inputProps={{
                                style: {
                                    fontSize: 15,
                                    height: '20px',
                                    width: '32vw',
                                },
                            }}
                            required
                        />
                        </div>

                        {/* description */}
                        <div className="mb-3">
                        <InputLabel
                            htmlFor="standard-brandName"
                            sx={{ textAlign: 'left', fontSize: 15, color: 'black', fontWeight: 'bold' }}
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
                                    fontSize: 15,
                                    width: '32vw'
                                }, // Adjust the font size as needed
                            }}
                        />
                        </div>

                        {/* Price */}
                        <div className="mb-3">
                        <InputLabel
                            htmlFor="standard-brandName"
                            sx={{ textAlign: 'left', fontSize: 15, color: 'black', fontWeight: 'bold' }}
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
                                        fontSize: 15,
                                        height: '20px',
                                        width: '30vw'
                                    }, // Adjust the font size as needed
                                }}
                            />
                        </FormControl>
                        </div>

                        {/* Size */}
                        <Size setFormData={setFormData}/>
                        <br />

                        {/* Category */}
                        <Category setFormData={setFormData} />

                        {/* Checkbox */}
                        <FormControl
                            required
                            error={errorMessage}
                            component="fieldset"
                            sx={{ m: 3, fontSize:"15px" }}
                            variant="standard"
                        >
                            <FormLabel 
                            component="legend" style={{fontWeight:"bold"}}>At least one check</FormLabel>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} checked={formData.formen} name='formen' label="Male" onChange={handleCheckbox}
                                sx={{ mt: -1.5 }}  />
                                <FormControlLabel control={<Checkbox />} checked={formData.forwomen} name='forwomen' label="Female" onChange={handleCheckbox}
                                sx={{ mt: -1.5 }} />
                            </FormGroup>
                        </FormControl>
                    </div>
                    </div>

                    <div className="col-sm-6 d-flex flex-column">
                    <div className="d-flex flex-column align-items-center">
                        <div className="mb-10">
                            <CldUploadWidget
                                uploadPreset="wad2_revogue"
                                options={{ folder: "product", maxFiles: 3 }}
                                onUpload={onupload}>
                                {({ open }) => {
                                    function handleOnClick(e) {
                                        e.preventDefault();
                                        open();
                                    }
                                    return (
                                        <button className={styles.button} onClick={handleOnClick}>
                                            Upload Product image
                                        </button>
                                    );
                                }}
                            </CldUploadWidget>
                        </div>

                        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
                            {imageUrls.map((imageUrl, index) => (
                                <div key={index} className='flex flex-col justify-center'>
                                    <img src={imageUrl} style={{ width: '150px', height: '150px' }} alt={`uploades Image ${index + 1}`} />
                                    <button style={{marginLeft:"10px", border:"none", backgroundColor:"white"}}onClick={() => handleDeleteImage(index)}><DeleteIcon/></button>
                                </div>
                            ))}
                        </div>

                        <button onClick={createItem} className={styles.submit}>Submit</button>
                    </div>
                    </div>
                </div>
            </div>
        </main>


    )
}

export default CreatePost;