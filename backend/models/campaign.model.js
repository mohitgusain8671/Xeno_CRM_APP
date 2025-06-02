import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    personalizedMessage: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'draft', "completed"],
        default: 'draft'
    },
    inititatedAt: {
        type: Date,
        default: null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    conditions: {
        type: Object,
        required: true
    },
    audienceSize: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
});

const Campaign = mongoose.model('Campaigns', campaignSchema);
export default Campaign;