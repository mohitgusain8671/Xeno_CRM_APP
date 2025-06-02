import { publisher } from "../config/redis.js";
import { calculateAudienceSize } from "../helper/campaign.helper.js";
import Campaign from "../models/campaign.model.js";

export const addCampaign = async (req, res, next) => {
    try {
        const { name, description, personalizedMessage, conditions } = req.body;
        const userId = req.userId;
        if (!name || !description || !personalizedMessage) {
            const error = new Error("name, description and personalizedMessage are required");
            error.statusCode = 400;
            throw error;
        }
        if (!conditions || typeof conditions !== 'object') {
            const error = new Error("conditions must be a valid object");
            error.statusCode = 400;
            throw error;
        }
        const newCampaign = new Campaign({
            name,
            description,
            personalizedMessage,
            user: userId,
            conditions
        });
        const audienceSize = await calculateAudienceSize(conditions);
        newCampaign.audienceSize = Number(audienceSize);

        await newCampaign.save();
        res.status(201).json({ message: "Campaign created successfully", campaign: newCampaign });

    } catch (error) {
        next(error);
    }
}

export const getAllCampaigns = async (req, res, next) => {
    try {
        const userId = req.userId;
        const campaigns = await Campaign.find(
            { user: { $ne: userId } } 
        ).populate('user', 'name email').sort({ createdAt: -1 });
        console.log(campaigns);
        res.status(200).json(campaigns);
    } catch (error) {
        next(error);
    }
}

export const getUserCampaigns = async (req, res, next) => {
    try {
        const userId = req.userId;
        const campaigns = await Campaign.find({ user: userId }).populate('user', 'name email').sort({ createdAt: -1 });;
        
        res.status(200).json(campaigns);
    } catch (error) {
        next(error);
    }
}

// export const updateCampaign = async (req, res, next) => {
//     try {
        
//     }
// }

export const initiateCampaign = async (req, res, next) => {
    try {
    const { id } = req.params;
    const userId = req.userId;
    const campaign = await Campaign.findById(id);
    if (!campaign || campaign.status !== 'draft') {
      throw new Error('Invalid or already active campaign');
    }

    if(campaign.user.toString() !== userId) {
      const error = new Error("You are not authorized to initiate this campaign");
      error.statusCode = 403;
      throw error;
    }

    await publisher.publish('initiateCampaign', JSON.stringify({ id }));
    await campaign.updateOne({ status: 'active' });

    res.status(202).json({ success: true, message: 'Campaign initiated' });
  } catch (error) {
    next(error);
  }
}

export const deleteCampaign = async (req, res, next) => {
    try{
        const campaignId = req.params.id;
        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            const error = new Error("Campaign not found");
            error.statusCode = 404;
            throw error;
        }
        await Campaign.findByIdAndDelete(campaignId);
        res.status(200).json({ message: "Campaign deleted successfully" });
    } catch (error) {
        next(error);
    }
}

export const getAudienceSize = async (req, res, next) => {
    try {
        const { filters } = req.body;
        if (!filters) {
            const error = new Error("Conditions are required");
            error.statusCode = 400;
            throw error;
        }
        const audienceSize = await calculateAudienceSize(filters);
        res.status(200).json({ audienceSize });
    } catch (error) {
        next(error);
    }   
}
