import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import Product from "../../domain/entity/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";

describe("Order repository unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    sequelize.close();
  });

  it("should create a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Fulano");
    const address = new Address("Rua 1", 123, "Cidade", "Estado", 123);
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem("1", product.name, product.id, product.price, 2);

    const order = new Order("1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({ where: { id: "1" }, include: ["items"] });
    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "1",
      total: 20,
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 10,
          quantity: 2,
          order_id: "1",
          product_id: "1",
        },
      ],
    });
  });

  it("should update itens of a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Fulano");
    const address = new Address("Rua 1", 123, "Cidade", "Estado", 123);
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem("1", product.name, product.id, product.price, 2);

    const order = new Order("1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({ where: { id: "1" }, include: ["items"] });
    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "1",
      total: 20,
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 10,
          quantity: 2,
          order_id: "1",
          product_id: "1",
        },
      ],
    });

    const product2 = new Product("2", "Product 2", 20);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem("2", product2.name, product2.id, product2.price, 3);

    order.addItem([orderItem2]);

    await orderRepository.update(order);

    const orderModel2 = await OrderModel.findOne({ where: { id: "1" }, include: ["items"] });
    expect(orderModel2.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "1",
      total: 80,
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 10,
          quantity: 2,
          order_id: "1",
          product_id: "1",
        },
        {
          id: "2",
          name: "Product 2",
          price: 20,
          quantity: 3,
          order_id: "1",
          product_id: "2",
        },
      ],
    });
  });
});
