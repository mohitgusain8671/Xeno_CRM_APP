import { Router } from "express";
import { createOrder, getAllCustomerOrders, getAllOrder, getOrder, updateStatus } from "../controllers/order.controller.js";

const orderRouter = Router();

// Create Order
orderRouter.post('', createOrder);
// Get all Orders
orderRouter.get('', getAllOrder);
// Get all Orders of a Customer
orderRouter.get('/customer/:customerId', getAllCustomerOrders);
// Get Order by ID
orderRouter.get('/:id', getOrder);
// Update Order by ID (only status)
orderRouter.put('/:id/status', updateStatus);

export default orderRouter;