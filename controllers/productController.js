const { Product, Category } = require('../models');
const response = require('../services/response');
const upload = require('../middlewares/upload');

const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: {
                model: Category,
                as: 'category',
            },
            attributes: {
                exclude: ['category_id'],
            },
        });
        const data = products.map((product) => {
            return {
                ...product.toJSON(),
                image: `uploads/images/products/${product.image}`,
            };
        });
        response(200, true, data, 'Success get all products', res);
    } catch (error) {
        console.error(error);
        response(400, false, error, 'Failed to get products', res);
    }
};

const getProductsByCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const checkCategory = await Category.findByPk(categoryId);
        if (!checkCategory) {
            return response(400, false, '', 'category id not found', res);
        }
        const products = await Product.findAll({
            where: {
                category_id: categoryId,
            },
        });
        const data = products.map((product) => {
            return {
                ...product.toJSON(),
                image: `uploads/images/products/${product.image}`,
            };
        });
        return response(
            200,
            true,
            data,
            'Success get product by id category',
            res
        );
    } catch (error) {
        console.error(error);
        response(400, false, error, 'Failed to get products', res);
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id, {
            include: {
                model: Category,
                as: 'category',
            },
        });
        const data = {
            ...product.toJSON(),
            image: `uploads/images/products/${product.image}`,
        };
        response(200, true, data, 'Success get product by id', res);
    } catch (error) {
        console.error(error);
        response(400, false, error, 'Failed to get the product', res);
    }
};

const createProduct = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error(err);
            return response(
                400,
                false,
                err,
                'Failed to create new product, image error',
                res
            );
        }
        try {
            const product = {
                ...req.body,
            };
            const image = req?.file?.filename;
            const data = {
                ...product,
                image,
            };
            const newProduct = await Product.create(data);
            response(201, true, newProduct, 'Succes to add new product', res);
        } catch (error) {
            console.error(error);
            response(400, false, error, 'Failed to add product', res);
        }
    });
};

const updateProduct = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error(err);
            return response(
                400,
                false,
                err,
                'Failed to create new product, image error',
                res
            );
        }
        try {
            const { id } = req.params;
            const edit = {
                ...req.body,
            };
            const image = req?.file?.filename;
            const data = {
                ...edit,
                image,
            };
            const product = await Product.findByPk(id);
            if (!product) {
                return response(
                    400,
                    false,
                    '',
                    'Failed to edit product, id product not found',
                    res
                );
            }
            const editedProduct = await product.update(data);
            response(201, true, editedProduct, 'Success edited product', res);
        } catch (error) {
            console.error(error);
            response(400, false, error, 'Failed to edit product', res);
        }
    });
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return response(
                400,
                false,
                '',
                'Failed to delete product, id product not found',
                res
            );
        }
        const deletedProduct = await product.destroy();
        response(201, true, deletedProduct, 'Success delete product', res);
    } catch (error) {
        console.error(error);
        response(400, false, error, 'Failed to delete product', res);
    }
};

const restoreProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id, { paranoid: false });
        if (!product) {
            return response(
                400,
                false,
                '',
                'Failed to restore product, id product not found',
                res
            );
        }
        const deletedProduct = await product.restore();
        response(
            201,
            true,
            deletedProduct,
            'Success restore deleted product',
            res
        );
    } catch (error) {
        console.error(error);
        response(400, false, error, 'Failed to delete product', res);
    }
};

module.exports = {
    getProducts,
    getProductsByCategory,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    restoreProduct,
};
