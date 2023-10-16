'use client'
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { CldUploadWidget } from 'next-cloudinary';

export function ProductUpload() {
    const [imageUrls, setImageUrls] = useState([]);

    return (
        <div>
            <CldUploadWidget
                uploadPreset="wad2_revogue"
                options={{ folder: "product" }}
                onUpload={(result) => {
                    console.log(result);
                    const newImageUrl = result.info.secure_url;
                    setImageUrls(prevImageUrls => [...prevImageUrls, newImageUrl]);
                }}>
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
            <div>
                {imageUrls.map((imageUrl, index) => (
                    <div key={index} >
                        <img src={imageUrl} ></img>
                        <p>{imageUrl}</p>
                    </div>
                ))}
            </div>
        </div >
    )
}
