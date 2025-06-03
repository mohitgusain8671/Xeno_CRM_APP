import axios from 'axios';
import CommunicationLog from '../models/communicationLog.model.js'
import { API_URL, AI_KEY, MODEL } from '../config/openrouter.js';

export const summarizeCampaign = async (req, res) => {
  try {
    const { campaign } = req.body;

    const logs = await CommunicationLog.find({ campaign: campaign._id });


    const prompt = `
Campaign Details: ${campaign}

Communication Logs:
${logs}

Please provide a summary of this campaign's effectiveness and recommendations(2-3 points only) for improvement. do not produce large summary provide in brief for example "Your campaign reached 1,284 users. 1,140 messages were delivered. Customers with
> ₹10K spend had a 95% delivery rate."
    `;
    
    const response = await axios.post(API_URL, {
      model: MODEL,
      messages: [
        
        { role: 'user', content: prompt }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${AI_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    const summary = response.data.choices[0]?.message?.content;

    res.json({ success: true, summary });

  } catch (err) {
    console.error('Error summarizing campaign:', err);
    res.status(500).json({ success: false, error: 'Failed to summarize campaign' });
  }
};
