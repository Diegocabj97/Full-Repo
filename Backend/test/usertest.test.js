import mongoose from "mongoose";
import Assert from "assert";
import { userModel } from "../src/models/users.models.js";
import dotenv from "dotenv/config.js";
const assert = Assert.strict;
await mongoose.connect(process.env.MONGO_URL);

describe("Test CRUD de usuarios en la ruta /api/users", () => {
  // PREVIO A ARRANCAR TODO EL TEST
  before(() => {
    console.log("Arrancando test");
  });
  // PREVIO A ARRANCAR CADA UNO DE LOS TESTS

  beforeEach(() => {
    console.log("Comienza test!");
  });
  it("Obtener todos los usuarios mediante GET", async () => {
    const users = await userModel.find();
    assert.strictEqual(Array.isArray(users), true);
  });
  it("Obtener un usuario mediante GET", async () => {
    const user = await userModel.findById("657f9247cd2a509560b73463");

    assert.strictEqual(typeof user, "object");
    assert.ok(user._id);
  });
  it("Crear un usuario mediante POST", async () => {
    const newUser = {
      first_name: "roberto",
      last_name: "jacinto",
      email: "asdas@gmail.com",
      password: "1233213445453456",
      age: 20,
    };
    const user = await userModel.create(newUser);
    assert.ok(user._id);
  });
  it("Actualizar un usuario mediante put", async () => {
    const newUser = {
      first_name: "alfredo",
      last_name: "gonzalez",
      email: "alfredo@gmail.com",
      password: "987654321",
      age: 21,
    };
    const user = await userModel.findByIdAndUpdate(
      "657f9247cd2a509560b73463",
      newUser
    );
    assert.ok(user._id);
  });
  it("Eliminar un usuario mediante DELETE", async () => {
    const resultado = await userModel.findByIdAndDelete(
      "657f9247cd2a509560b73463"
    );
    assert.strictEqual(typeof resultado, "object");
    assert.ok(resultado._id);
  });
});
