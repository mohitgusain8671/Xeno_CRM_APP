import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
});

const User = mongoose.model('Users', userSchema);
export default User;