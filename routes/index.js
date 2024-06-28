const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  register,
  login,
  logout,
  refreshToken,
} = require('../controllers/authenticationController');
const { showProfile } = require('../controllers/userController');
const {
  getProducts,
  getProductsByCategory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  restoreProduct,
} = require('../controllers/productController');
const {
  getCategories,
  createCategory,
  getDetailCategory,
  updateCategory,
  deleteCategory,
  restoreCategory,
} = require('../controllers/categoryController');
const {
  createOrder,
  getOrders,
  getOrdersById,
} = require('../controllers/orderController');

router.get('/', (req, res) => {
  res.send('Home');
});

router.post('/register', register);
router.post('/login', login);
// router.delete('/logout', auth, logout);
router.delete('/logout', logout);
router.get('/token', refreshToken);

router.get('/profile', auth, showProfile);

router.get('/dashboard', auth, (req, res) => {
  res.sendStatus(200);
});

router.get('/products', getProducts);
router.get('/products/category/:categoryId', getProductsByCategory);
router.post('/product', createProduct);
router.put('/products/:id', updateProduct);
router.get('/products/:id', getProductById);
router.delete('/products/:id', deleteProduct);
router.post('/products/restore/:id', restoreProduct);

router.get('/categories', getCategories);
router.get('/categories/:id', getDetailCategory);
router.post('/category', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);
router.post('/categories/restore/:id', restoreCategory);

router.post('/checkout', createOrder);
router.get('/orders', getOrders);
router.get('/orders/:id', getOrdersById);

module.exports = router;
