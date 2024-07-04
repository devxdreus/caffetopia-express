const { Order, User } = require('../models');
const response = require('../services/response');

const createOrder = async (req, res) => {
    try {
        const { username, order, amount, tableNumber, diningOption, note } =
            req.body;

        const user = await User.findOne({
            where: {
                username,
            },
        });

        const products = JSON.stringify(order);

        const data = await Order.create({
            user_id: user.id,
            products,
            amount,
            table_number: tableNumber,
            note,
            dining_option: diningOption,
            orderStatus: 'pending',
        });

        response(201, true, data, 'Order created successfully', res);
    } catch (error) {
        console.error(error);
        response(500, false, error, 'Failed to create order', res);
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: {
                model: User,
                as: 'user',
            },
            attributes: {
                exclude: ['user_id'],
            },
        });
        response(200, true, orders, 'Success fetch all orders', res);
    } catch (error) {
        console.error(error);
        response(500, false, error, 'Failed to fetch orders', res);
    }
};

const getOrdersById = async (req, res) => {
    const { id } = req.params;

    try {
        const orders = await Order.findOne({
            where: {
                id: id,
            },
            include: {
                model: User,
                as: 'user',
            },
            attributes: {
                exclude: ['user_id'],
            },
        });
        response(200, true, orders, 'Success fetch order', res);
    } catch (error) {
        console.error(error);
        response(500, false, error, 'Failed to fetch order', res);
    }
};

const updateOrderStatus = async (req, res) => {
    const order = await Order.findByPk(req.params.id);
    // const updatedOrder = await order.update(req.body.status);
    order.status = req.body.status;
    await order.save();

    response(200, true, order, 'Success update order', res);
};

module.exports = {
    createOrder,
    getOrders,
    getOrdersById,
    updateOrderStatus,
};
