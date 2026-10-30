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
import { T } from './libs/types/common';

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({ 
 uri: String(process.env.MONGO_URL), // qaysi databasega ulanish
 collection: "session", // "session" nomli collectionda saqlanishini bildiradi
});


/** 1-ENTRANCE **/
const app = express();


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // Traditional API support
app.use(express.json()); // Rest API support
app.use(morgan(MORGAN_FORMAT)) // Logging standartlari
/** 2-SESSIONS **/       // Tamg'a
app.use(
    session({
        secret: String(process.env.SESSION_SECRET), //sessionlarni hosil qilishda ishlatiladigon kod
        cookie: {
            maxAge: 1000 * 3600 * 6,
        },
        store: store, //session'lar yuqorida yasagan MongoDB store'da saqlansin
        resave: false,
        saveUninitialized: true,
    })
);
app.use(function(req, res, next) {
    const sessionInstance = req.session as T;
    res.locals.member = sessionInstance.member;
    next();
})


/** 3-VIEWS **/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs") // backend da HTML quradi 

/** 4-ROUTERS **/
app.use("/admin", routerAdmin)  // SSR: EJS
app.use("/", router)            //SPA: REACT


export default app;