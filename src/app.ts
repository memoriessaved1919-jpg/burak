import express from 'express';
// express kutubxonasini import qilyapmiz — Node.js uchun web-server yaratish framework'i
import path from 'path';
// path — Node.js'ning o'zida mavjud modul, fayl/papka yo'llarini (path) to'g'ri qurish uchun ishlatiladi   
import router from "./router"
import routerAdmin from "./routerAdmin"



/** 1-ENTRANCE **/
const app = express();
// express() funksiyasini chaqirib, "app" nomli Express ilovasi (dastur) obyektini yaratyapmiz
// shu "app" orqali keyin barcha routing, middleware va server sozlamalari qilinadi


app.use(express.static(path.join(__dirname, "public")));
// app.use — middleware qo'shish uchun ishlatiladi (har bir so'rovda ishlaydigan funksiya)
// express.static(...) — "public" papkadagi fayllarni (masalan rasm, css, js) to'g'ridan-to'g'ri
// brauzerga ko'rsatishga ruxsat beradi
// path.join(__dirname, "public") — joriy fayl joylashgan papka ichidagi "public" papkaga to'liq yo'l quradi
// (__dirname — joriy faylning papka manzilini bildiruvchi, Node.js'ning o'zida mavjud o'zgaruvchi)
app.use(express.urlencoded({ extended: true }));
// HTML formadan yuborilgan ma'lumotlarni (masalan <form> orqali) o'qib, req.body ichiga joylab beradi
// "extended: true" — ichma-ich obyekt va massivlarni ham to'g'ri parslash imkonini beradi
app.use(express.json());
// so'rov (request) tanasida JSON formatida kelgan ma'lumotlarni o'qib, req.body ichiga joylab beradi
// (masalan frontend fetch/axios orqali JSON yuborganda shu kerak bo'ladi)
/** 2-SESSIONS **/


/** 3-VIEWS **/
app.set("views", path.join(__dirname, "views"));
// EJS shablon fayllari (.ejs) qaysi papkada joylashganini Express'ga aytib qo'yadi ("views" papka)
app.set("view engine", "ejs")
// Express'ga sahifalarni render qilishda EJS shablon dvigatelidan foydalanishni buyuradi
// shundan keyin res.render("nomi") chaqirilganda, u "views" papkadagi "nomi.ejs" faylini qidiradi


/** 4-ROUTERS **/
app.use("/admin", routerAdmin)  // SSR: EJS
app.use("/", router)            //SPA: REACT


export default app;