import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 5,
        maxLength: 255,
        // / Reg Exp --> (/S+ --> some string followed by @ then /S+ -->  some string then . /S+ --> followed by some string) / 
        match: [/\S+@\S+\.\S+/,'Please fill a valid email address']
    },
    phone: {
        type: String,
        required: [true, "phone number is required"],
        trim: true,
        validate: {
            validator: function(v) {
                return /^\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
    lastVisit: {
        type: Date,
        default: Date.now
    },
    lastOrder: {
        type: Date,
        default: null
    },
    visitCount: {
        type: Number,
        default: 0
    },
    totalSpend: {
        type: Number,
        default: 0
    },
    totalOrders: {
        type: Number,
        default: 0
    },
    avgOrderValue: {
        type: Number,
        default: 0
    }

},{ timestamps: true, versionKey: false });

const Customer = mongoose.model("Customers", customerSchema);
export default Customer;