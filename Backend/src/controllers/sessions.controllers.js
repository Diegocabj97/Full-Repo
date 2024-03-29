import { generateToken } from "../utils/jwt.js";
export const login = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({
        payload: "Usuario no registrado, por favor regístrese",
        status: "Error",
      });
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
    if (!req.cookies.jwtCookie) {
      const userCart = req.user.cart;
      const token = generateToken(req.user);
      res.cookie("jwtCookie", token, {
        maxAge: 86400000,
        HttpOnly: true,
      });
      const userId = req.user._id;
      res.status(200).send({
        userId,
        token,
        cart: userCart,
        payload: "Sesion Iniciada",
        status: "success",
      });
    } else {
      res.status(504).send({
        payload: "Usted ya ha iniciado sesion",
        status: "Error",
      });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).send({ mensaje: `Error al iniciar sesion ${error}` });
  }
};
export const register = async (req, res) => {
  try {
    if (req.user) {
      return res.status(200).send({
        status: "success",
        payload: "Usuario registrado exitosamente",
      });
    } else {
      const errorMessage = req.authInfo.message || "Error en el registro";
      return res.status(400).send({ status: "error", payload: errorMessage });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status: "error", payload: "Hubo un error al registrar usuario" });
  }
};

export const logout = async (req, res) => {
  try {
    //Si la sesión se crea en la BDD
    /* if (req.session.login) {
      req.session.destroy();
    } */
    console.log("Cookie " + req.cookies.jwtCookie);

    if (req.cookies.jwtCookie) {
      res.clearCookie("jwtCookie", { path: "/" });
      res.clearCookie("cartid", { path: "/" });
      console.log("Usuario deslogeado");
      res
        .status(200)
        .send({ payload: "Usuario deslogeado", status: "success" });
    } else {
      res.status(404).send({
        payload: "Debes iniciar sesion previamente!",
        status: "Error",
      });
    }
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
