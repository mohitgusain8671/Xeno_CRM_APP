import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customers",
        required: [true, "customerId is required"]
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    totalAmount: {
        type: Number,
        required: [true, "totalAmount is required"],
        min: 0
    },
    items: [
        {
            // We can use refrence to Product table here --> (in future)
            productId: String, 
            name: String,
            quantity: Number,
            price: Number
        }
    ],
    status: {
        type: String,
        enum: ['PENDING', 'COMPLETED', 'CANCELLED'],
        default: 'COMPLETED'
    },
}, { timestamps: true, versionKey: false });

const Order = mongoose.model("Orders", orderSchema);
export default Order;