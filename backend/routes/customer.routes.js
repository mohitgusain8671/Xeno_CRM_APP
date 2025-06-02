import { Router } from "express";
import { addCustomer, getAllCustomer, getCustomer, updateVisitStatus } from "../controllers/customer.controller.js";

const customerRouter = Router();

// Add Customer
customerRouter.post('', addCustomer);
// Get all Customers
customerRouter.get('', getAllCustomer);
// Get Customer by ID
customerRouter.get('/:id', getCustomer);
// Update Customer by ID (only Visit Count and Last Visit Date)
customerRouter.put('/:id/visit', updateVisitStatus);

export default customerRouter;