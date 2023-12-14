import { generateToken } from "../utils/jwt.js";

export const login = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ mensaje: "Usuario invalido" });
    }
    /*
      Si se usa session en BDD,
      req.session.user = {
          first_name: req.user.first_name,
          last_name: req.user.last_name,
          age: req.user.age,
          email: req.user.email
          res.status(200).send({mensaje: "Usuario logueado"})
      }*/
    const userCart = req.user.cart;
    const token = generateToken(req.user);
    res.status(200).json({ token, cart: userCart });
    console.log(userCart);
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).send({ mensaje: `Error al iniciar sesion ${error}` });
  }
};
export const register = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(501).send("Usuario ya existente");
    } else {
      res.status(200).send("Usuario registrado");
    }
  } catch (error) {
    res.status(500).send(`Error al registrar usuario ${error}`);
  }
};
export const logout = async (req, res) => {
  try {
    //Si la sesión se crea en la BDD
    /* if (req.session.login) {
      req.session.destroy();
    } */
    res.clearCookie("jwtCookie", { path: "/" });
    console.log("Usuario deslogeado");
    res.status(200).send("Usuario deslogeado");
  } catch (error) {
    res.status(500).send({ resultado: "Error al cerrar sesión", error: error });
  }
};

export const tryJwt = async (req, res) => {
  console.log(req);
  res.send(req.user);
};

export const current = async (req, res) => {
  res.send(req.user);
};

export const GithubLogin = async (req, res) => {
  req.session.user = req.user;
  res.status(200).send({ mensaje: "Usuario logeado con Github" });
  res.redirect("/");
};
