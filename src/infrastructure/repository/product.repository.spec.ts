import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequelize/model/product.model";
import Product from "../../domain/product/entity/product";
import ProductRepository from "./product.repository";

describe("Product repository unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });
    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 10,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);

    await productRepository.create(product);
    product.changeName("Product 2");
    product.changePrice(20);

    await productRepository.update(product);

    const foundProduct = await ProductModel.findOne({ where: { id: "1" } });
    expect(foundProduct.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 2",
      price: 20,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);

    await productRepository.create(product);

    const foundProduct = await productRepository.findOne("1");
    expect(foundProduct.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 10,
    });
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);
    const product2 = new Product("2", "Product 2", 20);
    await productRepository.create(product2);

    const products = await productRepository.findAll();

    expect(products).toHaveLength(2);

    const foundProduct = await productRepository.findOne("1");
    expect(foundProduct.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 10,
    });

    const productModel2 = await productRepository.findOne("2");
    expect(productModel2.toJSON()).toStrictEqual({
      id: "2",
      name: "Product 2",
      price: 20,
    });
  });
});
