//Routers y DOTENV
import router from "./Routes/index.routes.js";
//////////////////////
//EXPREESS SOCKET y CORS
import express from "express";
import session from "express-session";
import cors from "cors";
//////////////////////
//PATH
import { __dirname } from "./path.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
//MONGO Y COOKIE PARSER
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
//////////////////////
//PASSPORT Y MODELS
import passport from "passport";
import initializePassport from "./config/passport.js";
//////////////////////
//MAILING y LOGGERS
import nodemailer from "nodemailer";
import { addlogger } from "./utils/logger.js";

//////////////////////

// CORS OPTIONS
const whiteList = ["http://localhost:5173", "http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) != -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Acceso denegado"));
    }
  },
  credentials: true,
};

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Documentación del E-Commerce",
      description: "Api Coder Backend",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`], //  ** indica una subcarpeta que no me interesa el nombre
};
const specs = swaggerJSDoc(swaggerOptions);
///////////////////////
const app = express();

app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

const PORT = 3000;
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//Artillery
app.get("/testArtillery", (req, res) => {
  res.send("Hola desde artillery");
});

//MAILING

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "diegojadrian97@gmail.com",
    pass: process.env.PASSWORD_EMAIL,
    authMethod: "LOGIN",
  },
});
export const sendRecoveryMail = (email, recoveryLink) => {
  const mailOptions = {
    from: "diegojadrian97@gmail.com",
    to: email,
    subject: "Link para restablecer su contraseña",
    html: `
    <div>
      <h1>
      Haga click en este link para restablecer su contraseña: ${recoveryLink}
      </h1>
    </div>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else console.log("Email enviado correctamente");
  });
};

app.get("/mail", async (req, res) => {
  const resultado = await transporter.sendMail({
    from: "diegojadrian97@gmail.com",
    to: "diegocabj97@hotmail.com",
    subject: "Gil",
    html: `
    <div>
      <h1>
      Este es un mail de prueba
      </h1>
      <h2>Más le vale que me arreglen el aire</h2>
    </div>`,
  });
  console.log(resultado);
  res.send("Email enviado");
});
//////////////////////
//BDD
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("BDD conectada");

    /*   const resCartProds = await CartModel.findOne({
      _id: "6506041a8b0752b8b129f0bd",
    });
    console.log(JSON.stringify(resCartProds)); */

    /* const resUsers = await userModel.paginate(
      { limit: 20 },
      { sort: { edad: "asc" } }
    );
    console.log(resUsers); */
  })
  .catch(() => console.log("Error al conectarse a la BDD"));
// Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser(process.env.SIGNED_COOKIE)); // La cookie esta firmada
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      mongoOptions: {
        useNewUrlParser: true, //Establezco que la conexion sea mediante URL
        useUnifiedTopology: true, //Manego de clusters de manera dinamica
      },
      ttl: 60, //Duracion de la sesion en la BDD en segundos
    }),
    secret: process.env.SESSION_SECRET,
    resave: false, //Fuerzo a que se intente guardar a pesar de no tener modificacion en los datos
    saveUninitialized: false, //Fuerzo a guardar la session a pesar de no tener ningun dato
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

////////////////////////////////////////////////

//Routes
app.use("/", router);
app.use(addlogger);
app.get("/info", (req, res) => {
  req.logger.info('<span style="color:green">Texto de Info</span><br/>');
  req.res.send("Hola!");
});
app.get("/error", (req, res) => {
  req.logger.error('<span style="color:magenta">Texto de error</span><br/>');
  req.res.send("Hola!");
});
app.get("/debug", (req, res) => {
  req.logger.debug('<span style="color:yellow">Texto de debug</span><br/>');
  req.res.send("Hola!");
});
app.get("/fatal", (req, res) => {
  req.logger.fatal('<span style="color:red">Texto de fatal</span><br/>');
  req.res.send("Hola!");
});

app.get("/warning", (req, res) => {
  req.logger.warning('<span style="color:blue">Texto de warning</span><br/>');
  req.res.send("Hola!");
});
//Server
app.listen(PORT, () => {
  console.log(`Server on Port ${PORT}`);
});
