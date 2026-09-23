// Architecturl pattern: MVC, Dependency Injection, MVP
// MVC = MODEL VIEW CONTROLLER


// Design pattern: Middleware, Decorator


// Module JS                                     // Common JS
//import moment from 'moment';     // const moment = require('moment')
import dotenv from 'dotenv'    // dotenv paketini import qilyapmiz — u .env faylni o'qish uchun kerak
dotenv.config();               // .env fayldagi barcha qiymatlarni process.env ichiga yozib qo'yadi       


// CLUSTER => DATABASE => COLLECTION => DOCUMENT

import mongoose from 'mongoose'

mongoose
    .connect(process.env.MONGO_URL as string, {})
    .then((data) => {
        console.log("MongoDB connection succeed");
        const PORT = process.env.PORT ?? 3003
    })
    .catch((err) => console.log("ERROR on connection MongoDB", err))

