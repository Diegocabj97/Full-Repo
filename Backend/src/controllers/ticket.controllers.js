import { CartModel } from "../models/cart.models.js";
import { ticketModel } from "../models/ticket.models.js";
import { userModel } from "../models/users.models.js";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import { sendTicketToEmail } from "../main.js";

const generarCodeUnico = () => {
  return uuidv4();
};
export const postCompra = async (req, res) => {
  const cartId = req.params.cid;
  const userEmail = req.user.email;

  try {
    const cart = await CartModel.findById(cartId).populate("products._id");

    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }

    let insufficientStock = false;

    for (const item of cart.products) {
      const product = item._id;
      const quantity = item.quantity;

      if (product.stock >= quantity) {
        product.stock -= quantity;
        await product.save();
      } else {
        insufficientStock = true;
        res
          .status(201)
          .send(`un producto fue eliminado del carrito por falta de stock`);
        cart.products = cart.products.filter(
          (cartItem) => cartItem._id.toString() !== product._id.toString()
        );
      }
    }

    if (insufficientStock) {
      res.status(401).send("Stock insuficiente");
      return res.redirect("/");
    }

    const total = cart.products.reduce(
      (acc, item) => acc + item.quantity * item._id.price,
      0
    );

    cart.default = [{ products: cart.products, total }];
    await cart.save();

    try {
      const ticket = new ticketModel({
        products: cart.products.map((item) => ({
          id: item._id,
          title: item._id.title,
          quantity: item.quantity,
          price: item._id.price,
        })),
        amount: total,
        email: userEmail,
        purchaser: cart._id,
        code: generarCodeUnico(),
      });
      console.log("Productos del carrito" + cart.products);
      await ticket.save();
      sendTicketToEmail(ticket);
      cart.products = [];
      cart.total = 0;
      await cart.save();
      res.status(200).send("Ticket creado, gracias por su compra");
    } catch (error) {
      res.status(500).send({
        respuesta: "Error al crear el ticket",
        mensaje: error.message || "Error desconocido al crear el ticket",
      });
    }
  } catch (error) {
    return res.status(404).send({
      respuesta: "Error al chequear el carrito",
      mensaje: error.message || "Error desconocido al chequear el carrito",
    });
  }
};
