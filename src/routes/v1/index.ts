import { Router } from "express";
import { version } from "os";

const router = Router();


router.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Welcome to the API',
        version: '1.0.0',
        status: 'OK',
        docs: 'https://docs.blog-api.vercel.com',
        timestamp: new Date().toISOString(),
    });
});

export default router;