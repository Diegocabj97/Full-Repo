import { CartModel } from "../models/cart.models";
import { ticketModel } from "../models/ticket.models";
export const postCompra = async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await CartModel.findById(cartId).populate("Items.product");

    if (!cart) {
      return res.status(404).send("carrito no encontrado");
    }
  } catch {
    return res.status(404).send("carrito no encontrado");
  }
  const NonStockProds = [];
  for (const item of cart.items) {
    const product = item.product;
    const quantity = item.quantity;
    if (product.stock >= quantity) {
      product.stock -= quantity;
      await product.save();
    } else {
      NonStockProds.push(product._id);
    }
  }
  cart.items = cart.items.filter(
    (cartItem) => !NonStockProds.includes(cartItem.product._id)
  );
  await cart.save();

  try {
    const ticket = new ticketModel({
      products: cart.products,
      amount: cart.total,
      purchaser: cart.id,
    });
    await ticket.save();
    res.status(200).send("Ticket creado, gracias por su compra");
  } catch (error) {
    res.status(500).send({
      respuesta: "Error al crear ticket",
      mensaje: error,
    });
  }
};
