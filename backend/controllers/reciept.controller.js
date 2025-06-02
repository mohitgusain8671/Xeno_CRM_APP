import CommunicationLog from '../models/communicationLog.model.js';

export const deliveryReceipt = async (req, res, next) => {
  try {
    const { logId, status } = req.body;
    await CommunicationLog.findByIdAndUpdate(logId, {
      status,
      deliveredAt: new Date()
    });
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};