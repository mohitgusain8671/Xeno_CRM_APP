import mongoose from 'mongoose';

const communicationLogSchema = new mongoose.Schema({
    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaigns',
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['SENT', 'FAILED', 'PENDING'],
        default: 'PENDING'
    },
    sentAt: {
        type: Date,
        default: null
    },
    deliveredAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
    versionKey: false
});
const CommunicationLog = mongoose.model('CommunicationLogs', communicationLogSchema);
export default CommunicationLog;