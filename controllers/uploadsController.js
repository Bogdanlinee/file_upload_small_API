const { StatusCodes } = require('http-status-codes');
const path = require('path');
const CustomError = require('../errors/index');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const { json } = require('express');

const uploadProductImageLocal = async (req, res) => {
  const imageMaxSize = 1024 * 1024;

  if (!req.files) {
    throw new CustomError.BadRequestError('No file uploaded');
  }

  const productImage = req.files.image;

  if (!productImage.mimetype.statsWith('image/jpeg')) {
    throw new CustomError.BadRequestError('Please upload image.');
  }

  if (productImage.size > imageMaxSize) {
    throw new CustomError.BadRequestError('Image has to be less then ' + imageMaxSize);
  }

  const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`);
  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({
    image: {
      src: `/uploads/${productImage.name}`
    }
  });
}

const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
    use_filename: true, folder: 'upload-test'
  });

  fs.unlinkSync(req.files.image.tempFilePath);

  res.status(StatusCodes.OK).json({
    image: {
      src: result.secure_url
    }
  });
}

module.exports = { uploadProductImage };