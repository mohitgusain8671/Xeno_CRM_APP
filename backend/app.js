import express from 'express';
import { PORT, NODE_ENV, ORIGIN } from './config/env.js';
import errorMiddleware from './middlewares/error.middleware.js';
import connectToDB from './database/mongodb.js';
import { connectToRedis } from './config/redis.js';
import customerRouter from './routes/customer.routes.js';
import orderRouter from './routes/orders.routes.js';
import { startCustomerWorker } from './workers/consumer.worker.js';
import { startOrderWorker } from './workers/order.worker.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import passport from 'passport';
import './config/passport.js'; 
import campaignRouter from './routes/campaign.routes.js';
import vendorRouter from './routes/vendor.routes.js';
import { deliveryReceipt } from './controllers/reciept.controller.js';
import { startCampaignWorker } from './workers/campaign.worker.js';

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: [ORIGIN],
  methods: ['GET', 'POST', 'PUT', 'DELETE',"PATCH"],
  credentials: true,
}))
app.use(express.json());
app.use(passport.initialize());

app.use('/api/v1/customer', customerRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/auth', authRouter);
app.use('/api/v1/campaigns', campaignRouter);
app.use('/api/v1/vendor', vendorRouter);

app.post('/api/v1/receipt', deliveryReceipt);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

async function startServer() {
  try {
    await connectToDB();
    await connectToRedis();
    startCustomerWorker();
    startOrderWorker();
    startCampaignWorker();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
  }
}

startServer();

