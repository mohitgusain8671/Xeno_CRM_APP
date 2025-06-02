export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = '/auth';
export const CAMPAIGN_ROUTES = '/api/v1/campaigns';

export const USER_ROUTES = `${AUTH_ROUTES}/user`;
export const GOOGLE_AUTH = `${AUTH_ROUTES}/google`;
export const GOOGLE_AUTH_CALLBACK = `${AUTH_ROUTES}/google/callback`;
export const LOGOUT = `${AUTH_ROUTES}/logout`;

export const CREATE_CAMPAIGN = `${CAMPAIGN_ROUTES}`;
export const GET_ALL_CAMPAIGNS = `${CAMPAIGN_ROUTES}`;
export const GET_USER_CAMPAIGNS = `${CAMPAIGN_ROUTES}/user`;
export const DELETE_CAMPAIGN = `${CAMPAIGN_ROUTES}/:id`;
export const INITIATE_CAMPAIGN = `${CAMPAIGN_ROUTES}/:id/initiate`;
export const GET_AUDIENCE_SIZE = `${CAMPAIGN_ROUTES}/audience-size`;