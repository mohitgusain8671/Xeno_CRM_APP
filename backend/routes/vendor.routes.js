import { Router } from "express";
import axios from "axios";

const vendorRouter = Router();

vendorRouter.post('/send', async (req, res) => {
    const { logId, customerId, message } = req.body;

    const isSuccess = Math.random() < 0.9;
    const status = isSuccess ? 'SENT' : 'FAILED';
    // Call delivery receipt endpoint
    await axios.post('http://localhost:3000/api/v1/receipt', {
        logId,
        status
    });
    res.status(200).json({ success: true, status });
});

export default vendorRouter;