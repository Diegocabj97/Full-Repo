import local from "passport-local"; //Importo la estrategia
import githubStrategy from "passport-github2";
import jwt from "passport-jwt";
import passport from "passport";
import { createHash, validatePassword } from "../utils/bcrypt.js";
import { userModel } from "../models/users.models.js";
import "dotenv/config";

//Defino la estregia a utilizar
const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt; //Extrar de las cookies el token

const initializePassport = () => {
  const cookieExtractor = (req) => {
    //En lugar de tomar de las cookies directamente todo de la peticion
    const token = req.cookies.jwtCookie ? req.cookies.jwtCookie : {};

    console.log("cookieExtractor", token);

    return token;
  };

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), //El token va a venir desde cookieExtractor
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwt_payload, done) => {
        //jwt_payload = info del token (en este caso, datos del cliente)
        try {
          console.log("JWT", jwt_payload);
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        //Registro de usuario

        const { first_name, last_name, email, age } = req.body;

        try {
          const user = await userModel.findOne({ email: email });

          if (user) {
            //Caso de error: usuario existe
            return done(null, false);
          }

          //Crear usuario

          const passwordHash = createHash(password);
          const userCreated = await userModel.create({
            first_name: first_name,
            last_name: last_name,
            age: age,
            email: email,
            password: passwordHash,
          });

          return done(null, userCreated);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });

          if (!user) {
            return done(null, false);
          }

          if (validatePassword(password, user.password)) {
            return done(null, user);
          }

          return done(null, false);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //Inicializar la session del user
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  //Eliminar la session del user
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });
};

//GITHUB

passport.use(
  "github",
  new githubStrategy(
    {
      clientID: process.env.client_ID,
      clientSecret: process.env.SECRET_CLIENT,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile._json);

        const user = await userModel.findOne({ email: profile._json.email });
        if (user) {
          done(null, false);
        } else {
          const userCreated = await userModel.create({
            first_name: profile._json.name,
            last_name: " ",
            email: profile._json.email,
            age: 18, //Default Age
            password: createHash(profile._json.email),
          });
          done(null, userCreated);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

export default initializePassport;
