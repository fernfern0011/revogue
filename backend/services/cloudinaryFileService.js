const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET
});

var cloudinaryFileServices = {
    // This function delets an image from Cloudinary
    deleteImage: async function (publicId, callback) {
        console.log(cloud_name, api_key, api_secret, upload_preset);

        cloudinary.uploader.destroy(publicId, { upload_preset: 'wad2_revogue', folder: 'product' }).then((result) => {

            console.log(result);
            // let data = { message: "Successfully deleted image from Cloudinary", status: 200 };
            // return callback(null, data);
        }).catch((error) => { return callback(error, null); });
    }
};

module.exports = cloudinaryFileServices;