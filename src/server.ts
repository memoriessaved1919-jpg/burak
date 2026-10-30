import dotenv from 'dotenv'    // dotenv .env(environmental variable) olib tizimga yuklab beradi
dotenv.config();
import mongoose from 'mongoose'   // mongoose - MongoDB bilan ishlash uchun
import app from "./app"
// CLUSTER => DATABASE => COLLECTION => DOCUMENT


// TCP connection
mongoose
    .connect(process.env.MONGO_URL as string, {}) // .env fayldagi MONGO_URL manzili orqali MongoDB bazasiga ulanishga harakat qiladi
    .then((data) => {
        console.log("MongoDB connection succeed");
        const PORT = process.env.PORT ?? 3003
        app.listen(PORT, function () {
            console.info(`The server is running successfully on port: ${PORT}`)
            console.info(`Admin project on http://localhost:${PORT}/admin \n`)
        })
    })
    .catch((err) => console.log("ERROR on connection MongoDB", err));

