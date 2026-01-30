const express = require("express");
const bcrypt = require("bcrypt");
const { Manejador } = require("./ManejadorGlobal");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const mysql = require("mysql2");
const helmet = require("helmet");
const csrf = require("csurf");
const { claveS, claveT } = require("../Config/Claves");
const routerTestimonie = require("../Router/RouterTestimonies");
const cors = require("cors");
const routerUsuario = require("../Router/RouterUsuario");
const routerPost = require("../Router/RouterPosts");
const routerHome = require("../Router/RouterHome");
const routerPostMissions = require("../Router/RouterPostMissions");
const routerAbout = require("../Router/RouterAbout");
const routerContact_messages = require("../Router/RouterContact_messages");
const routerIncome = require("../Router/RouterIncome");
const routerExpense = require("../Router/RouterExpenses");
const routerBalance = require("../Router/RouterReportes");
const routerAssets = require("../Router/RouterAssets");
const routerStripe = require("../Router/RouterStripe");
const routerActivities = require("../Router/RouterActivities");
const routerMissions = require("../Router/RouterMissions");
const routerRefresh = require("../Router/RouterRefreshToken");
const AppError = require ("../Utils/AppError")
const app = express();

const dbOptions = {
  host: "localhost",
  user: "root",
  password: "RicardodraciR",
  database: "proyectoIglesia",
};
const sessionStore = new MySQLStore(dbOptions);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    store: sessionStore,
    secret: claveS,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 20 * 60,
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    },
  })
);
app.use(helmet());
//app.use(csrf());

//Rutas
app.use("/Api", routerStripe);
app.use(express.json());

app.use("/Api", routerUsuario);
app.use("/Api", routerTestimonie);
app.use("/Api", routerPost);
app.use("/Api", routerHome);
app.use("/Api", routerPostMissions);
app.use("/Api", routerAbout);
app.use("/Api", routerContact_messages);
app.use("/Api", routerIncome);
app.use("/Api", routerExpense);
app.use("/Api", routerBalance);
app.use("/Api", routerAssets);
app.use("/Api", routerActivities);
app.use("/Api", routerMissions);
app.use("/Api", routerRefresh);
app.use( (req, res, next) => {
  next(new AppError(`No se pudo encontrar ${req.originalUrl} en este servidor`, 404));
});
app.use(Manejador);
const server = app.listen(4000, () => {
  console.log("Server escuchando en el puerto 4000");
});
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Apagando...');
  console.log(err.name, err.message);
  
 
  server.close(() => {
    process.exit(1); 
  });
});