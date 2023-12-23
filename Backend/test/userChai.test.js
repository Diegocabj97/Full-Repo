import chai from "chai";
import mongoose from "mongoose";
import { userModel } from "../src/models/users.models.js";

const expect = chai.expect;

await mongoose.connect(
  "mongodb+srv://diegojadrian97:pwDatabase@cluster0.fnd7hyr.mongodb.net/?retryWrites=true&w=majority"
);

describe("Test CRUD de Users con Chai en api/users", function () {
  /* it("Obtener todos los usuarios mediante GET", async () => {
    const users = await userModel.find();

    expect(users).not.to.be.deep.equal([]);
    //expect(Array.isArray(users)).to.be.ok;
  });
  it("Obtener un usuario mediante GET", async () => {
    const user = await userModel.findById("657f93984b9d9ecea884568d");
    expect(user).to.have.property("_id");
  }); */
  it("Crear un usuario mediante POST", async () => {
    const newUser = {
      first_name: "Diego",
      last_name: "Diego",
      email: "test@test.com",
      password: "Test123",
      age: 21,
    };
    const user = await userModel.create(newUser);
    expect(user).to.have.property("_id");
  }); /* 
  it("Actualizar un usuario mediante put", async () => {
    const newUser = {
      first_name: "nicolas",
      last_name: "gonzalez",
      email: "nicolas@gmail.com",
      password: "987654321",
      age: 21,
    };
    const user = await userModel.findByIdAndUpdate(
      "657f93984b9d9ecea884568d",
      newUser
    );
    expect(user).to.have.property("_id");
  });
  it("Eliminar un usuario mediante DELETE", async () => {
    const resultado = await userModel.findByIdAndDelete(
      "657f93984b9d9ecea884568d"
    );
    expect(resultado).to.be.ok;
  }); */
});
