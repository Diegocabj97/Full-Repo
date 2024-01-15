import { sendRecoveryMail } from "../main.js";
import { userModel } from "../models/users.models.js";
import crypto from "crypto";
import path from "path";
export const getAll = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send({ respuesta: "Ok", mensaje: users });
  } catch (error) {
    res
      .status(404)
      .send({ respuesta: "Error al consultar usuarios", mensaje: error });
  }
};
export const getById = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await userModel.findById(uid);
    if (user) {
      res.status(200).send({ respuesta: "Ok", mensaje: user });
    } else {
      res.status(404).send({ respuesta: "Error", mensaje: "User not found" });
    }
  } catch (error) {
    res
      .status(404)
      .send({ respuesta: "Error al consultar este usuario", mensaje: error });
  }
};
export const putById = async (req, res) => {
  const { uid } = req.params;
  const { first_name, last_name, /* age, */ email, password } = req.body;

  try {
    const user = await userModel.findByIdAndUpdate(uid, {
      first_name,
      last_name /* 
      age, */,
      email,
      password,
    });
    if (user) {
      res.status(200).send({ respuesta: "Ok", mensaje: user });
    } else {
      res.status(404).send({
        respuesta: "Error al actualizar usuario",
        mensaje: "User not found",
      });
    }
  } catch (error) {
    res.status(404).send({ respuesta: "Error", mensaje: error });
  }
};

export const deleteByid = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await userModel.findByuidAndDelete(uid);
    if (user) {
      res.status(200).send({ respuesta: "Ok", mensaje: user });
    } else {
      res.status(404).send({
        respuesta: "Error al eliminar el usuario",
        mensaje: "User not found",
      });
    }
  } catch (error) {
    res.status(404).send({ respuesta: "Error", mensaje: error });
  }
};

// PW RECOVERY
const recoveryLinks = {};
export const pwRecovery = (req, res) => {
  const { email } = req.body;
  try {
    const token = crypto.randomBytes(20).toString("hex"); // Token unico para que no hayan 2 iguales para dif users
    recoveryLinks[token] = {
      email: email,
      timestamp: Date.now(),
    };
    const recoveryLink = `http://localhost:8080/api/users/reset-password/${token}`;
    sendRecoveryMail(email, recoveryLink);
    res.status(200).send("Email de recuperación enviado");
  } catch (error) {
    res.status(500).send(`Error al enviar el mail ${error}`);
  }
};

export const pwReset = (req, res) => {
  const { token } = req.params;
  const { newPassword, newPassword2 } = req.body;
  try {
    const linkData = recoveryLinks[token];
    if (linkData && Date.now() - linkData.timestamp <= 3600000) {
      if (newPassword == newPassword2) {
        delete recoveryLinks[token];
        res.status(200).send("Contraseña modificada correctamente");
      } else {
        res.status(400).send("Las contraseñas deben ser idénticas");
      }
      //Modificar usuario con nueva contraseña
    } else {
      res.status(400).send("link inválido o expirado, pruebe nuevamente");
    }
  } catch (error) {
    res.status(500).send(`Error al modificar contraseña ${error}`);
  }
};

export const documentsUpload = (req, res) => {
  try {
    console.log(req.file);
    res.status(200).send("Imagen cargada");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al procesar la solicitud");
  }
};
export const profilePicsUpload = async (req, res) => {
  const { uid } = req.params;
  const { filename } = req.file;
  try {
    const user = await userModel.findByIdAndUpdate(
      uid,
      {
        $push: {
          thumbnail: path
            .join("src", "public", "js", "profilePics", filename)
            .replace(/\\/g, "/")
            .slice(0, -1),
        },
      },
      { new: true }
    );
    if (user) {
      res.status(200).send("Imagen de perfil cargada");
    } else {
      res.status(404).send({
        respuesta: "Error al actualizar usuario",
        mensaje: "User not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al procesar la solicitud");
  }
};
export const prodPicsUpload = (req, res) => {
  try {
    console.log(req.file);
    res.status(200).send("Imagen del producto cargada");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al procesar la solicitud");
  }
};
