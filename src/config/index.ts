import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV,
    WHITELIST_ORIGINS:['httpS://docs.blog-api.vercel.com'],
    MONGO_URI: process.env.MONGO_URI ,
};

export default config;