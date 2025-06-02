import { config } from "dotenv";

config( { path: '.env' } );

export const { 
    PORT, NODE_ENV,
    DB_URI,
    CLIENT_ID, CLIENT_SECRET, REDIRECT_URI,
    JWT_SECRET, ORIGIN,
    REDIS_URL, HOST
} = process.env