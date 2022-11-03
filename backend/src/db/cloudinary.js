const cloudinary = require('cloudinary').v2

cloudinary.config({
  // cloud_name: process.env.CLOUDINARY_NAME,
  // api_key: process.env.CLOUDINARY_API_KEY,
  // api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: 'dycgvrxas',
  api_key: '399219369786287',
  api_secret: '15bzJJhzyuO4dm7pd5vPafYkEDw' 
})

module.exports = cloudinary;