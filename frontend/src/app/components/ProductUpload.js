import styles from "../../../styles/Home.module.css";
import { CldUploadWidget } from 'next-cloudinary';
import React, { useEffect, useState } from "react";

async function deleteImageCloudinary({ toDeleteImage }) {
    // get product list
    const deleteImageCloudinaryRes = await fetch(`http://localhost:5000/services/cloudinary/delete-image`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imagePublicId: toDeleteImage })
    }).catch(error => {
        const err = error;
        console.log(err)
    });

    const deleteStatus = await deleteImageCloudinaryRes.status;

    if (deleteStatus == 200) {
        return deleteStatus
    }
}

const ProductUpload = ({ info, updateInfo, imageUrls, setImageUrls, handleImageChange }) => {
    const [publicId, setPublicId] = useState('');

    const onupload = (result) => {
        console.log(result);
        updateInfo(result.info.secure_url);
        setPublicId(result.info.publicId);

        const newImageUrl = result.info.secure_url
        setImageUrls(preImageUrls => [...preImageUrls, newImageUrl])
        handleImageChange(result)
    }

    const handleDeleteImage = async (index) => {
        setImageUrls(async prevImageUrls => {
            // var toDeleteImage = prevImageUrls[index];
            // console.log(toDeleteImage);

            // const deleteImageCloudinaryRes = await deleteImageCloudinary({ toDeleteImage });
            // const deleteStatus = deleteImageCloudinaryRes
            // console.log(deleteStatus);

            const updateImageUrls = [...prevImageUrls]
            updateImageUrls.splice(index, 1)
            return updateImageUrls
        })
    }

    return (
        <div className="mb-10">
            <CldUploadWidget
                uploadPreset="wad2_revogue"
                options={{ folder: "product" }}
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
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
                {/* {imageUrls.map((imageUrl, index) => (
                    <div key={index} className='flex flex-col justify-center'>
                        <img src={imageUrl} style={{ width: '150px', height: '150px' }} alt={`uploades Image ${index + 1}`} />
                        <p>{imageUrl}</p>
                        <button className='border-[1px] rounded-lg p-1 px-2 mt-5' onClick={() => handleDeleteImage(index)}>delete</button>
                    </div>
                ))} */}
            </div>
        </div >
    )
}

export default ProductUpload;
