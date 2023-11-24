import { CartModel } from "../models/cart.models.js";
import { productModel } from "../models/products.models.js";

export const getCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await CartModel.findById(cid).populate("products.id_prod");
    if (cart) {
      res.status(200).send(cart);
    } else {
      res.status(404).send("Carrito no encontrado");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
export const postCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  if (!quantity || isNaN(quantity) || quantity <= 0) {
    return res.status(400).send("Cantidad inválida");
  }

  try {
    const cart = await CartModel.findById(cid);
    if (cart) {
      const prod = await productModel.findById(pid);
      if (prod) {
        const indice = cart.products.findIndex(
          (prod) => prod.id_prod._id.toString() === pid
        );
        if (indice !== -1) {
          cart.products[indice].quantity = quantity;
        } else {
          cart.products.push({ id_prod: pid, quantity: quantity });
        }

        // Recalcular el total
        const total = cart.products.reduce(
          (acc, item) => acc + item.quantity * item.id_prod.price,
          0
        );

        // Actualizar el total en el carrito
        cart.default = [{ products: cart.products, total }];
        await cart.save();

        return res.status(200).send({
          respuesta: "Ok",
          mensaje: "Producto actualizado en el carrito",
        });
      } else {
        return res.status(404).send({
          respuesta: "Error al agregar un producto a este carrito",
          mensaje: "Producto no encontrado",
        });
      }
    } else {
      return res.status(404).send({
        respuesta: "Error al agregar un producto a este carrito",
        mensaje: "Carrito no encontrado",
      });
    }
  } catch (error) {
    return res.status(500).send({
      respuesta: "Error al agregar un producto a este carrito",
      mensaje: error,
    });
  }
};

export const putCart = async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;

  try {
    const cart = await CartModel.findById(cid);
    if (cart) {
      cart.products = products; // Asigna el nuevo arreglo de productos al carrito
      await CartModel.findByIdAndUpdate(cid, cart);
      return res.status(200).send({
        respuesta: "Ok",
        mensaje: "Carrito actualizado",
      });
    } else {
      return res.status(404).send({
        respuesta: "Error al actualizar el carrito",
        mensaje: "Carrito no encontrado",
      });
    }
  } catch (error) {
    return res.status(500).send({
      respuesta: "Error al actualizar el carrito",
      mensaje: error,
    });
  }
};
export const deleteCart = async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await CartModel.findById(cid);
    if (cart) {
      cart.products = [];

      const total = cart.products.reduce(
        (acc, item) => acc + item.quantity * item.id_prod.price,
        0
      );

      cart.default = [{ products: cart.products, total }];
      await cart.save();

      return res.status(200).send({
        status: "success",
        payload: "Todos los productos han sido eliminados del carrito",
      });
    } else {
      return res.status(404).send({
        status: "error",
        payload: "Carrito no encontrado",
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: "error",
      payload: error,
    });
  }
};
