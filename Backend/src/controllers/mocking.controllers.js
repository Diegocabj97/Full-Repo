import { fakerprodModel } from "../utils/mocking.js";

export const createRandomProducts = (cantProds, req, res) => {

  try {
    const products = [];
    for (let i = 0; i < cantProds; i++) {
      products.push(fakerprodModel());
    }
    return res.status(200).send(products);
  } catch (error) {
    return res
      .status(500)
      .send({ error: "No se pudo crear los productos random" });
  }
};
