import chai from "chai";
import mongoose from "mongoose";
import supertest from "supertest";
const expect = chai.expect;

const requester = supertest("localhost:3000");

await mongoose.connect(
  "mongodb+srv://diegojadrian97:pwDatabase@cluster0.fnd7hyr.mongodb.net/?retryWrites=true&w=majority"
);
// PRODUCTS TEST
describe("Test CRUD de productos de la ruta api/products", function () {
  it("Ruta:api/products metodo GET", async () => {
    const { ok } = await requester.get("/api/products");
    expect(ok).to.be.ok;
  });
  it("Ruta: api/products metodo POST", async () => {
    const newProduct = {
      title: "Placa de video",
      description: "La mejor del mundo",
      code: "ABC8541",
      price: 25000,
      stock: 50,
      category: "Placas de Video",
      quantity: 1,
    };
    const { statusCode, _body, ok } = await requester
      .post("/api/products")
      .send(newProduct);
    // expect(statusCode).to.be.equal(200)
    // expect(_body.status).to.be.equal("success");
    // expect(ok).to.be.ok;
  });

  it("Ruta: api/products metodo PUT", async () => {
    const id = "658435d10b2e597616c40517";
    const updateProduct = {
      title: "Procesadorcito",
      description: "El mejor del mundo",
      code: "CPU3932",
      price: 55000,
      stock: 20,
      category: "Procesadorcito fantastico",
      quantity: 1,
    };
    const { ok } = await requester
      .put(`/api/products/${id}`)
      .send(updateProduct);
    // expect(statusCode).to.be.equal(200)
    // expect(_body.status).to.be.equal("success");
    // expect(ok).to.be.ok;
  });
  it("Ruta: api/products metodo DELETE", async () => {
    const id = "65843e257cee496e71090080";
    const { ok } = await requester.delete(`/api/products/${id}`);
    // expect(statusCode).to.be.equal(200)
    // expect(_body.status).to.be.equal("success");
    // expect(ok).to.be.ok;
  });
});
// SESSIONS TEST
describe("Test CRUD de sessions de la ruta api/sessions", function () {
  let cookie = "";
  it("Ruta api/sessions/register con metodo POST", async () => {
    const newUser = {
      first_name: "test",
      last_name: "test",
      email: "test95@test.com",
      password: "Test123",
    };
    const response = await requester
      .post("/api/sessions/register")
      .send(newUser);
    expect(response.body.status).to.be.equal("success");
  });
  it("Ruta api/sessions/login con metodo POST", async () => {
    const loginUser = {
      email: "test95@test.com",
      password: "Test123",
    };
    const resultado = await requester
      .post("/api/sessions/login")
      .send(loginUser);
    const cookieResult = resultado.headers["set-cookie"][0];
    expect(cookieResult).to.be.ok;
    cookie = {
      name: cookieResult.split("=")[0],
      value: cookieResult.split("=")[1],
    };
    expect(cookie.name).to.be.ok.and.equal("jwtCookie");
    expect(cookie.value).to.be.ok;
  });

  it("Ruta api/sessions/current con metodo GET", async () => {
    const { _body } = await requester
      .get("/api/sessions/current")
      .set("Cookie", [`${cookie.name} = ${cookie.value}`]);
    expect(_body.user.email).to.be.equal("test95@test.com");
  });
});

// CARTS TEST
describe("Test CRUD de sessions de la ruta api/cart", function () {
  it("Ruta:api/cart metodo GET", async () => {
    const response = await requester.get("/api/cart");
    expect(response.body.status).to.be.equal("success");
  });
  it("Ruta:api/cart metodo GET By ID", async () => {
    const cid = "659e9eeb4926c34d691137c6";
    const response = await requester.get(`/api/cart/${cid}`);
    expect(response.body.status).to.be.equal("success");
    expect(response.body.payload._id).to.be.equal("659e9eeb4926c34d691137c6");
  });
  it("Ruta:api/cart metodo GET By ID", async () => {
    const cid = "659e9eeb4926c34d691137c6";
    const response = await requester.get(`/api/cart/${cid}`);
    expect(response.body.status).to.be.equal("success");
    expect(response.body.payload._id).to.be.equal("659e9eeb4926c34d691137c6");
  });

  it("Ruta:api/cart metodo POST", async () => {
    const cid = "659e9eeb4926c34d691137c6";
    const pid = "657b2811fed006f7c8ca3863";
    const prodQuantity = {
      quantity: 5,
    };
    const { statusCode, _body } = await requester
      .post(`/api/cart/${cid}/product/${pid}`)
      .send(prodQuantity);
    expect(statusCode).to.be.equal(200);
    expect(_body.status).to.be.equal("success");
  });
  it("Ruta:api/cart metodo DELETE By ID", async () => {
    const cid = "659e9eeb4926c34d691137c6";
    const response = await requester.delete(`/api/cart/${cid}`);
    expect(response.body.status).to.be.equal("success");
  });
});
