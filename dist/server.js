"use strict";
// Architecturl pattern: MVC, Dependency Injection, MVP
// MVC = MODEL VIEW CONTROLLER
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Design pattern: Middleware, Decorator
const dotenv_1 = __importDefault(require("dotenv")); // dotenv .env(environmental variable) olib tizimga yuklab beradi
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose")); // mongoose - MongoDB bilan ishlash uchun
const app_1 = __importDefault(require("./app"));
// CLUSTER => DATABASE => COLLECTION => DOCUMENT
// TCP connection
mongoose_1.default
    .connect(process.env.MONGO_URL, {}) // .env fayldagi MONGO_URL manzili orqali MongoDB bazasiga ulanishga harakat qiladi
    // "as string" — TypeScript'ga "bu qiymat aniq string" deb majburan aytib qo'yish (chunki process.env qiymati undefined ham bo'lishi mumkin)
    .then((data) => {
    console.log("MongoDB connection succeed");
    const PORT = process.env.PORT ?? 3003; // .env dagi PORT qiymatini oladi, agar u bo'lmasa (undefined), 3003 ni ishlatadi
    // ("??" — nullish coalescing: chap tomon null/undefined bo'lsagina o'ng tomon ishlatiladi)
    app_1.default.listen(PORT, function () {
        console.info(`The server is running successfully on port: ${PORT}`);
        console.info(`Admin project on http://localhost:${PORT}/admin \n`);
    });
})
    .catch((err) => console.log("ERROR on connection MongoDB", err));
