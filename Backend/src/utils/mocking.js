import { faker } from "@faker-js/faker";
export const fakerprodModel = () => {
  return {
    _id: faker.database.mongodbObjectId,
    code: faker.string.uuid(),
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    stock: faker.number.int(50),
    category: faker.commerce.department(),
    status: true,
    description: faker.commerce.productDescription(),
    quantity: 1,
    thumbnail: faker.image.avatarGitHub(),
  };
};
const createRandomProduct = (cantProds) => {
  const products = [];
  for (let i = 0; i < cantProds; i++) {
    products.push(fakerprodModel());
  }
  return products;
};
console.log(createRandomProduct(100));
