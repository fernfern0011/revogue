'use client'
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { CldUploadWidget } from 'next-cloudinary';

export function ProfileUpload() {
    const [imageUrl, setImageUrl] = useState("");
    const [imagePublicId, setImagePublicId] = useState("");

    const confirmProfileImage = async () => {
        const res = await fetch("http://localhost:5000/api/user-profile/upload-profile-image", {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                'imageUrl': imageUrl,
                'imagePublicId': imagePublicId,
                'accid': 1
            })
        }).catch(error => { console.log(error); });

        // Check the status code returned
        if (res !== undefined && res.status == 200) {
            alert("Upload done")
        } else {
            alert("Failed to update new profile image")
        };
    }

    return (
        <div>
            <CldUploadWidget
                uploadPreset="wad2_revogue"
                options={{ folder: "profile", maxFiles: 1 }}
                onUpload={(result) => {
                    const newImageUrl = result.info.secure_url;
                    const newImagePublicId = result.info.public_id;
                    setImageUrl(newImageUrl);
                    setImagePublicId(newImagePublicId);
                }}>
                {({ open }) => {
                    function handleOnClick(e) {
                        e.preventDefault();
                        open();
                    }
                    return (
                        <button className={styles.button} onClick={handleOnClick}>
                            Upload Profile image
                        </button>
                    );
                }}
            </CldUploadWidget>
            <div>
                <img src={imageUrl} ></img>
                <p>{imageUrl}</p>
            </div>
            <div>
                {imageUrl != "" ?
                    <button className={styles.button} onClick={confirmProfileImage}>
                        Save the change
                    </button> : ""}
            </div>
        </div>
    )
}
