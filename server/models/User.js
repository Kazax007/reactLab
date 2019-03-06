var mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require('dotenv').config();

var UserSchema = mongoose.Schema({
  login: String,
  password: String,
  first_name: String,
  last_name: String
});

UserSchema.statics.checkAuth = () => (req, res, next) => {
  var token = req.cookies[AUTH_COOKIE_NAME];

  // проверка токена jwt.verify (возвращает объект, который положили в getJwtToken)
  // если токен проешел проверку то
  // 1)в объект req положить объект с id пользователя req.user = {}
  // 2)вызываем функцию next()
  // иначе возвращаем 401 ошибку
  try {
    var decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    if(decoded){
      req.user = {_id: decoded};
      next();
    }
  } catch(err) {
    res.json({error: err});
  }
};

UserSchema.methods.getJwtToken = function () {
  const {_id, login} = this;
  var token = jwt.sign({ _id, login }, process.env.JWT_TOKEN_SECRET);
};

var User = mongoose.model("User", UserSchema);
module.exports = User;
