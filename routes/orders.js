const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Util = require('../util');

router.get("/", Util.isAuth, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user');
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send("ERROR: " + { message: error });
    }
});

router.post("/", Util.isAuth, async (req, res) => {
    try {
        const newOrder = new Order({
            orderItems: req.body.orderItems,
            user: req.user._id,
            shipping: req.body.shipping,
            payment: req.body.payment,
            itemsPrice: req.body.itemsPrice,
            taxPrice: req.body.taxPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice
        });

        const newOrderCreated = await newOrder.save();
        if (newOrderCreated) {
            res.status(201).send({ message: 'New Order Created', data: newOrderCreated });
        } else {
            res.status(500).send({ message: 'Error while creating Order' });
        }
    } catch (error) {
        res.send("ERROR: " + { message: error });
    }
});

router.get("/:orderId", Util.isAuth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (order) {
            res.send(order);
        } else {
            res.status(404).send({ message: 'Order with id ' + req.params.orderId + ' not found.' });
        }
    } catch (error) {
        res.send("ERROR: " + { message: error });
    }
});

router.put("/:orderId", async (req, res) => {
    try {
        const updatedOrder = await Order.updateOne(
            { _id: req.params.orderId },
            {
                $set: {
                    user: req.user._id,
                    shipping: req.body.shipping,
                    payment: req.body.payment,
                    itemsPrice: req.body.itemsPrice,
                    taxPrice: req.body.taxPrice,
                    shippingPrice: req.body.shippingPrice,
                    totalPrice: req.body.totalPrice,
                }
            });
        res.send(updatedOrder);
    } catch (error) {
        res.send("ERROR: " + { message: error });
    }
});

router.delete("/:orderId", async (req, res) => {
    try {
        const removedOrder = await Order.deleteOne({ _id: req.params.orderId });
        res.send(removedOrder);
    } catch (error) {
        res.send("ERROR: " + { message: error });
    }
});

router.put("/:orderId/pay", Util.isAuth, async (req, res) => {
    const order = await Order.findById(req.params.orderId);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.payment = {
            paymentMethod: 'paypal',
            paymentResult: {
                payerID: req.body.payerID,
                orderID: req.body.orderID,
                paymentID: req.body.paymentID
            }
        }
        const updatedOrder = await order.save();
        res.send({ message: 'Order Paid.', order: updatedOrder });
    } else {
        res.status(404).send({ message: 'Order not found.' })
    }
});

router.get("/mine", Util.isAuth, async (req, res) => {
    const orders = await Order.find({user: req.body.user._id });
    if (orders) {
        res.send(orders);
    } else {
        res.status(404).send({ message: 'Orders not found.' })
    }
});

module.exports = router;