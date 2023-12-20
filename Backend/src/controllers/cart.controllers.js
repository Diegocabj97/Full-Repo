import { CartModel } from "../models/cart.models.js";
import { productModel } from "../models/products.models.js";

export const getCarts = async (req, res) => {
  const { limit } = req.query;
  try {
    const carts = await CartModel.find().limit(limit);
    res.status(200).send({ respuesta: "ok", mensaje: carts });
  } catch (error) {
    res.status(400).send({ respuesta: "Error", mensaje: error });
  }
};
export const getCart = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await CartModel.findById(cid).populate("products._id");
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

  try {
    const cart = await CartModel.findById(cid).populate("products");
    cart.products.forEach((product) => {});
    if (cart) {
      const prod = await productModel.findById(pid);

      if (prod) {
        const indice = cart.products.findIndex(
          (product) => product._id._id.toString() === pid
        );
        if (indice !== -1) {
          // Incrementar la cantidad en 1 cada vez que se agrega
          const prodIndex = cart.products[indice];
          prodIndex.quantity += 1;
        } else {
          // Agregar un nuevo producto al carrito
          cart.products.push({ _id: prod, quantity: 1 });
        }
        // Recalcular el total
        const total = cart.products.reduce((acc, product) => {
          const productTotal = product.quantity * product._id.price;
          return acc + productTotal;
        }, 0);

        // Actualizar el total en el carrito
        cart.total = total;
        await cart.save();

        return res.status(200).send({
          respuesta: "Ok",
          mensaje: `Producto actualizado en el carrito.`,
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
      mensaje: error.message,
    });
  }
};

export const putCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await CartModel.findById(cid);

    if (!cart) {
      res
        .status(404)
        .send({ respuesta: "Carrito no encontrado", mensaje: "Not Found" });
    }

    const product = await productModel.findById(pid);
    if (!product) {
      res
        .status(404)
        .send({ respuesta: "Producto no encontrado", mensaje: "Not Found" });
    }

    const indice = cart.products.findIndex(
      (prod) => prod._id._id.toString() === pid
    );
    if (indice !== -1) {
      cart.products[indice].quantity = quantity;
    } else {
      cart.products.push({ _id: pid, quantity: quantity });
    }

    await cart.save();
    res
      .status(200)
      .send({ respuesta: "OK", mensaje: "Carrito actualizado", carrito: cart });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      respuesta: "Error",
      mensaje: "Ha ocurrido un error en el servidor",
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
        (acc, item) => acc + item.quantity * item.price,
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
