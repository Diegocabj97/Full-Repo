import { CartModel } from "../models/cart.models.js";
import { ticketModel } from "../models/ticket.models.js";
import { v4 as uuidv4 } from "uuid";

const generarCodeUnico = () => {
  return uuidv4();
};
export const postCompra = async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await CartModel.findById(cartId).populate("products.id_prod");

    console.log("Cart:", cart);

    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }

    let insufficientStock = false;

    for (const item of cart.products) {
      const product = item.id_prod;
      const quantity = item.quantity;

      if (product.stock >= quantity) {
        product.stock -= quantity;
        await product.save();
      } else {
        insufficientStock = true;
        console.log(`un producto fue eliminado del carrito por falta de stock`);
        cart.products = cart.products.filter(
          (cartItem) =>
            cartItem.id_prod._id.toString() !== product._id.toString()
        );
      }
    }

    if (insufficientStock) {
      console.log("Stock insuficiente");
      return res.redirect("/");
    }

    const total = cart.products.reduce(
      (acc, item) => acc + item.quantity * item.id_prod.price,
      0
    );

    cart.default = [{ products: cart.products, total }];
    await cart.save();

    try {
      const ticket = new ticketModel({
        products: cart.products.map((item) => ({
          id_prod: item.id_prod,
          quantity: item.quantity,
        })),
        amount: total,
        purchaser: cart._id,
        code: generarCodeUnico(),
      });

      await ticket.save();
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
