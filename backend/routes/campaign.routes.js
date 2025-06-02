import { Router } from 'express';
import { addCampaign, deleteCampaign, getAllCampaigns, getAudienceSize, getUserCampaigns, initiateCampaign } from '../controllers/campaign.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const campaignRouter = Router();

campaignRouter.post('',authorize, addCampaign);
campaignRouter.get('',authorize, getAllCampaigns);
campaignRouter.get('/user', authorize , getUserCampaigns);
// campaignRouter.put('', authorize, updateCampaign);
campaignRouter.delete('/:id', authorize, deleteCampaign);
campaignRouter.post('/:id/initiate', authorize, initiateCampaign);
campaignRouter.post('/audience-size', getAudienceSize);

export default campaignRouter;