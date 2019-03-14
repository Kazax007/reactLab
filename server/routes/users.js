var express = require('express');
var router = express.Router();
const {AUTH_COOKIE_NAME} = require("../utils/const");
const { createHash } = require('../utils');

const User = require("../models/User");

router.use("/me", User.checkAuth()); //добавление middleware, для проверки токена при каждом запросе
router.get("/me", async (req, res) => { //метод возвраащает профиль пользователя
    console.log("req.user me", req.user);

    const userId = req.user._id;
    if (!userId) {
        res.json({status: "error", error: "Индетификатор пользователя не найден"});
        return;
    }

    try {
        const user = await User.findOne({_id: userId});
        res.json({status: 200, user});
    } catch (err) {
        console.error(err)
    }
});

router.post("/login", async (req, res) => {
    console.log("req.body login", req.body);
    //Переданные параметры запроса хранятся в req.body
    const user = await User.findOne({login: req.body.login}); 
    res.cookie(AUTH_COOKIE_NAME, user.getJwtToken(), {  maxAge: 999999, httpOnly: true});
    res.json({status: 200, user});
    // Для поиска пользователя необходимо вызвать
    // const user = await User.findOne({login: req.body.login});

    //Ответ клиету отдаётся в 2-ух форматах
    // 1. res.json({status: "ok", user});
    // 2. res.json({status: "error", error: "Неверный пароль"});
    
    //Метод createHash создаёт хэш для безопасного хранения пароля в бд
});

router.post("/", async (req, res) => {
    console.log('req.body registration', req.body , req.cookies);
    //Переданные параметры запроса хранятся в req.body
    const userExists = await User.findOne({login: req.body.login});
    if(!userExists){
        console.log("start registration");
        const user = new User({login: req.body.login, password: createHash(req.body.password), first_name: req.body.first_name, last_name: req.body.last_name});
        try{
            user.save(); 
            res.cookie(AUTH_COOKIE_NAME, user.getJwtToken(), {  maxAge: 999999, httpOnly: true}); 
            res.json({status: 200, user});
        }
        catch(e){
            res.json({status: "error", error: e});
        }
    }
    else{
        res.json({status: "error", error: "Логин уже есть в базе"});
    }
    // Для создания пользователя необходимо вызвать
    // const user = new User({login: req.body.login});
    // Затем сохранить его в бд с помощью user.save();

    //Ответ клиету отдаётся в 2-ух форматах
    // 1. res.json({status: "ok", user});
    // 2. res.json({status: "error", error: "Неверный пароль"});

    //Метод createHash создаёт хэш для безопасного хранения пароля в бд
});

module.exports = router;

