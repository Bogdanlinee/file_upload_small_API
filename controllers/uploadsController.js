const { StatusCodes } = require('http-status-codes');
const path = require('path');
const CustomError = require('../errors/index');

const uploadProductImage = async (req, res) => {
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

module.exports = { uploadProductImage };