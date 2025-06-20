import express from 'express';
import config from './config';
import cors from 'cors';
import type { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';


const app = express();

const corsOptions : CorsOptions = {
    origin(origin, callback) {
        if(config.NODE_ENV === 'development'|| !origin || config.WHITELIST_ORIGINS.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS ERROR: ${origin} is not allowed by CORS`), false);
            console.log(`CORS ERROR: ${origin} is not allowed by CORS`);
        }
    }
};

app.use(cors(corsOptions)); // Disable CORS for all origins

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});