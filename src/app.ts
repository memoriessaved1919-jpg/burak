import express from 'express';
// express kutubxonasini import qilyapmiz — Node.js uchun web-server yaratish framework'i
import path from 'path';
// path — Node.js'ning o'zida mavjud modul, fayl/papka yo'llarini (path) to'g'ri qurish uchun ishlatiladi   
import router from "./router"
import routerAdmin from "./router-admin"
import morgan from "morgan"
import { MORGAN_FORMAT } from './libs/config';

import session from 'express-session';
import ConnectMongoDB from 'connect-mongodb-session';

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({ 
 uri: String(process.env.MONGO_URL), // qaysi databasega ulanish
 collection: "session", // "session" nomli collectionda saqlanishini bildiradi
});


/** 1-ENTRANCE **/
const app = express();
// express() funksiyasini chaqirib, "app" nomli Express ilovasi (dastur) obyektini yaratyapmiz
// shu "app" orqali keyin barcha routing, middleware va server sozlamalari qilinadi


app.use(express.static(path.join(__dirname, "public")));
// express.static(...) — "public" papkadagi fayllarni (masalan rasm, css, js) to'g'ridan-to'g'ri
// brauzerga ko'rsatishga ruxsat beradi
app.use(express.urlencoded({ extended: true })); // Traditional API support
// HTML formadan yuborilgan ma'lumotlarni (masalan <form> orqali) o'qib, req.body ichiga joylab beradi
// "extended: true" — ichma-ich obyekt va massivlarni ham to'g'ri parslash imkonini beradi
app.use(express.json()); // Rest API support
// so'rov (request) tanasida JSON formatida kelgan ma'lumotlarni o'qib, req.body ichiga joylab beradi
// (masalan frontend fetch/axios orqali JSON yuborganda shu kerak bo'ladi)
app.use(morgan(MORGAN_FORMAT)) // Logging standartlari
/** 2-SESSIONS **/       // Tamg'a
app.use(
    session({
        secret: String(process.env.SESSION_SECRET), //sessionlarni hosil qilishda ishlatiladigon kod
        cookie: {
            maxAge: 1000 * 3600 * 3, // 3h // sessionlar qancha vaqt amal qilishi
        },
        store: store, //session'lar yuqorida yasagan MongoDB store'da saqlansin
        resave: true,
        saveUninitialized: true,
    })
)


/** 3-VIEWS **/
app.set("views", path.join(__dirname, "views"));
// EJS shablon fayllari (.ejs) qaysi papkada joylashganini Express'ga aytib qo'yadi ("views" papka)
app.set("view engine", "ejs") // backend da HTML quradi 
// Express'ga sahifalarni render qilishda EJS shablon dvigatelidan foydalanishni buyuradi
// shundan keyin res.render("nomi") chaqirilganda, u "views" papkadagi "nomi.ejs" faylini qidiradi

/** 4-ROUTERS **/
app.use("/admin", routerAdmin)  // SSR: EJS
app.use("/", router)            //SPA: REACT


export default app;