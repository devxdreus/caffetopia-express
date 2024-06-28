const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images/products/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only image file are allowed.'), false);
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter,
}).single('image');

module.exports = upload;