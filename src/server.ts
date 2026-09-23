// Architecturl pattern: MVC, Dependency Injection, MVP
// MVC = MODEL VIEW CONTROLLER


// Design pattern: Middleware, Decorator


// Module JS                                     // Common JS
//import moment from 'moment';     // const moment = require('moment')
import dotenv from 'dotenv'    // dotenv paketini import qilyapmiz — u .env faylni o'qish uchun kerak
dotenv.config();               // .env fayldagi barcha qiymatlarni process.env ichiga yozib qo'yadi       
import mongoose from 'mongoose'   // mongoose kutubxonasini import qilyapmiz — MongoDB bilan ishlash uchun
import app from "./app"
// CLUSTER => DATABASE => COLLECTION => DOCUMENT



mongoose
    .connect(process.env.MONGO_URL as string, {}) // .env fayldagi MONGO_URL manzili orqali MongoDB bazasiga ulanishga harakat qiladi
    // "as string" — TypeScript'ga "bu qiymat aniq string" deb majburan aytib qo'yish (chunki process.env qiymati undefined ham bo'lishi mumkin)
    .then((data) => {
        console.log("MongoDB connection succeed");
        const PORT = process.env.PORT ?? 3003     // .env dagi PORT qiymatini oladi, agar u bo'lmasa (undefined), 3003 ni ishlatadi
        // ("??" — nullish coalescing: chap tomon null/undefined bo'lsagina o'ng tomon ishlatiladi)
        app.listen(PORT, function () {
            console.log(`The server is running successfully on port: ${PORT}`)
        })
    })
    .catch((err) => console.log("ERROR on connection MongoDB", err))

