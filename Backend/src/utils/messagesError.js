import passport from "passport";

//Funcion general para retornar errores es las estrategias de passport

export const passportError = (strategy) => {
  //Voy a enviar local, github o jwt
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) {
        return next(error); //Que la funcion que me llame maneje como va a responder ante mi error
      }
      if (!user) {
        return res
          .status(401)
          .send({ error: info.messages ? info.messages : info.toString() });
      }

      req.user = user;
      next();
    })(req, res, next); //Esto es por que me va a llamar un middleware
  };
};

//Recibo un rol y establezco la capacidad del usuario
export const authorization = (role) => {
  //rol = 'Admin' desde ruta 'Crear Producto'
  return async (req, res, next) => {
    console.log(req.user);
    if (!req.user) {
      return res
        .status(401)
        .send({ error: "Usted no esta autorizado para ver este contenido" });
    }
    if (req.user.role != role) {
      return res
        .status(403)
        .send({ error: "Usuario no tiene los permisos necesarios" });
    }
    next();
  };
};
