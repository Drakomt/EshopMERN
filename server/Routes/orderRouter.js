import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../Models/OrderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (order) {
      return res.send(order);
    }
    // res.sendsStatus(404)
    res.status(404).send({ message: "Order not found" });
  })
);

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const newOrder = new Order({
        orderItems: req.body.orderItems.map((item) => ({
          ...item, //! this may be a problem
          product: item._id,
        })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const order = await newOrder.save();
      res.status(201).send({ message: "New order Created", order });
    } catch (e) {
      res
        .status(500)
        .send({ message: "Error in creating new order: " + e.message });
    }
  })
);

export default orderRouter;
