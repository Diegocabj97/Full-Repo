import "dotenv/config";
import jwt from "jsonwebtoken";
export const generateToken = (user) => {
  try {
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });
    return token;
  } catch (error) {
    // Manejar el error aquí (puedes loguearlo o devolver un mensaje de error)
    console.error("Error al generar el token:", error);
    throw error;
  }
};

export const authToken = (req, res, next) => {
  //Consultar al header para obtener el Token
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "Usuario no autenticado" });
  }

  const token = authHeader.split(" ")[1]; //Obtengo el token y descarto el Bearer

  jwt.sign(token, process.env.JWT_SECRET, (error, credential) => {
    if (error) {
      return res
        .status(403)
        .send({ error: "Usuario no autorizado, token invalido" });
    }
  });

  //Usuario valido
  req.user = credential.user;
  next();
};
