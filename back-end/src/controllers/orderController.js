const { Order } = require("../models/orders");
const { User } = require("../models/user");

module.exports = {
    async addOrderItems(req, res) {
        const { cart } = req.body;
        const {
            user,
            orderItems,
            shippingAddress,
            paymentMethod,
            shippingCost,
            tax,
            totalPrice,
            itemsPrice,
        } = cart;

        try {
            if (!orderItems && orderItems.length === 0) {
                throw new Error("No order items");
            }
            if (
                !user ||
                !user.email ||
                !user.contactNum ||
                !user.name ||
                !user.surname
            ) {
                throw new Error("User Information is incomplete");
            }

            if (!shippingAddress) {
                throw new Error("Shipping address is required");
            }

            if (
                !paymentMethod ||
                !shippingCost ||
                !tax ||
                !totalPrice ||
                !itemsPrice
            ) {
                throw new Error(
                    "Some shipping information such as payment methods, shipping fees are missing"
                );
            }

            const order = new Order(cart);

            const createdOrder = await Order.create(order);

            // Now add the order to user
            const foundUser = await User.findById(user.userId);
            foundUser.orders = foundUser.orders.concat(createdOrder._id);

            await foundUser.save();

            // send the created orders
            res.status(201).send(createdOrder);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    },
    async getOrder(req, res) {
        const orderId = req.params.id;
        try {
            const order = await Order.findById(orderId);
            res.send(order);
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    },

    async deleteOrder(req, res) {
        const orderId = req.params.id;
        try {
            const order = await Order.findById(orderId);

            const user = await User.findById(order.user.userId);

            const orders = user.orders.filter(
                (item) => item.toString() !== orderId
            );

            user.orders = orders;
            await user.save();

            await order.remove();
            res.status(200).send("Successfully deleted order");
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    },
    async getAllOrders(req, res) {
        try {
            const orders = await Order.find({})
                .populate("user", "id name")
                .sort({ createdAt: -1 })
                .limit(12);
            res.status(200).send(orders);
        } catch (error) {
            res.status(404).send({ message: error.message });
        }
    },
    async updateOrderToDelivered(req, res) {
        const orderId = req.params.id;
        try {
            const order = await Order.findById(orderId);
            if (order.isDelivered === true) {
                order.isDelivered = false;
                order.deliveredAt = null;
            } else {
                order.isDelivered = true;
                order.deliveredAt = Date.now();
            }
            const updatedOrder = await order.save();
            res.send(updatedOrder);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    },
};
