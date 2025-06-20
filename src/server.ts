import express from 'express';
import config from './config';
import cors from 'cors';
import type { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import limiter from './lib/express_rate_limit';
import v1Routes from './routes/v1';
import { connectToDatabase, disconnectFromDatabase } from './lib/mongoose';

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

app.use(cookieParser());
app.use(compression(
    {
        threshold: 1024,     
    }
));
app.use(helmet());

app.use(limiter);

(async () => {
    try{

        await connectToDatabase();

        app.use('/api/v1', v1Routes);

        app.listen(config.PORT, () => {
        console.log(`Server running on port ${config.PORT}`);
        });

    }
    catch (error) {
        console.error('Error starting server:', error);
        if(config.NODE_ENV === 'production') {
            process.exit(1); 
        }
    }
})();


const handelServerShutdown = async () => {
    try{
        await disconnectFromDatabase();
        console.log('Shutting down server gracefully...');
        process.exit(0);
    }
    catch (error) {
        console.error('Error shutting down server:', error);
    }
}

process.on('SIGTERM', handelServerShutdown);
process.on('SIGINT', handelServerShutdown);

