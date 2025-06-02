import { subscriber } from '../config/redis.js';
import { buildQueryFromConditions } from '../helper/campaign.helper.js';
import Campaign from '../models/campaign.model.js';
import CommunicationLog from '../models/communicationLog.model.js';
import Customer from '../models/customer.model.js';
import axios from 'axios';

export const startCampaignWorker = async () => {
  try {
    await subscriber.subscribe('initiateCampaign', async (message) => {
      const { id } = JSON.parse(message);
      const campaignId = id;
      const campaign = await Campaign.findById(campaignId);
      console.log(`Received initiateCampaign message for campaign ID: ${campaignId}`);
      if (!campaign) return;
      console.log(`Processing campaign: ${campaign.name} (${campaign._id})`);
      const conditions = campaign.conditions;
      const query = buildQueryFromConditions(conditions);
      const customers = await Customer.find(query);

      const logs = [];
      console.log(`Found ${customers.length} customers for campaign ${campaignId}`);
      for (const customer of customers) {
        const personalizedMessage =  campaign.personalizedMessage
          ? campaign.personalizedMessage.replace(/{{name}}/g, customer.name || 'Customer')
          : '';

        const log = await CommunicationLog.create({
          campaign: campaign._id,
          customer: customer._id,
          message: personalizedMessage
        });

        logs.push(log);

        // Simulate vendor API call
        await axios.post('http://localhost:3000/api/v1/vendor/send', {
              logId: log._id,
              customerId: customer._id,
              message: personalizedMessage
        });
        log.status = 'SENT';
        log.sentAt = new Date();
        await log.save();
        console.log(`Message sent to ${customer.name}: ${personalizedMessage}`);
      }
      const now = new Date();
      console.log('Setting initiatedAt to:', now);
      await Campaign.findByIdAndUpdate(campaignId, { status: 'completed', inititatedAt: now });
      console.log(`Campaign ${campaignId} processed: ${logs.length} messages`);
    });

    console.log('Campaign Worker listening to initiateCampaign channel');
  } catch (err) {
    console.error('Failed to start Campaign Worker:', err);
  }
  
};