
import CustomerRepository from "../../customer/repository/customer.repository";
import CustomerModel from "../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./sequelize/order-item.model";
import OrderModel from "./sequelize/order.model";
import ProductModel from "../../product/repository/sequelize/product.model";
import OrderRepository from "./order.repository";
import ProductRepository from "../../product/repository/product.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import Product from "../../../domain/product/entity/product";
import OrderItem from "../../../domain/checkout/entity/order_item";
import Order from "../../../domain/checkout/entity/order";
import { Sequelize } from "sequelize-typescript";

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

    const orderModel1 = await OrderModel.findOne({ where: { id: "1" }, include: ["items"] });
    expect(orderModel1.toJSON()).toStrictEqual({
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

    orderItem.changeQuantity(3);

    const product2 = new Product("2", "Product 2", 20);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem("2", product2.name, product2.id, product2.price, 3);

    order.addItem([orderItem2]);

    await orderRepository.update(order);

    const orderModel2 = await OrderModel.findOne({ where: { id: "1" }, include: ["items"] });
    expect(orderModel2.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "1",
      total: 90,
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 10,
          quantity: 3,
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
    order.removeItem("1");

    await orderRepository.update(order);

    const orderModel3 = await OrderModel.findOne({ where: { id: "1" }, include: ["items"] });
    expect(orderModel3.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "1",
      total: 60,
      items: [
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

  it("should find a order por id", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Fulano");
    const address = new Address("Rua 1", 123, "Cidade", "Estado", 123);
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const product2 = new Product("2", "Product 2", 20);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem("2", product2.name, product2.id, product2.price, 3);

    const orderItem = new OrderItem("1", product.name, product.id, product.price, 2);

    const orderRepository = new OrderRepository();
    const order = new Order("1", customer.id, [orderItem]);

    order.addItem([orderItem2]);

    await orderRepository.create(order);
    const orderFound = await orderRepository.findOne("1");

    expect(order).toStrictEqual(orderFound);
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("1", "Fulano");
    const address = new Address("Rua 1", 123, "Cidade", "Estado", 123);
    customer1.changeAddress(address);
    await customerRepository.create(customer1);

    const customer2 = new Customer("2", "Beltrano");
    const address2 = new Address("Rua 2", 123, "Cidade", "Estado", 123);
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);

    const productRepository = new ProductRepository();
    const product1 = new Product("1", "Product 1", 10);
    await productRepository.create(product1);

    const product2 = new Product("2", "Product 2", 20);
    await productRepository.create(product2);

    const orderItem1 = new OrderItem("1", product1.name, product1.id, product1.price, 2);

    const orderItem2 = new OrderItem("2", product2.name, product2.id, product2.price, 3);

    const orderItem3 = new OrderItem("3", product2.name, product2.id, product2.price, 3);

    const orderRepository = new OrderRepository();

    const order1 = new Order("1", customer1.id, [orderItem1, orderItem2]);
    const order2 = new Order("2", customer2.id, [orderItem3]);

    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders).toHaveLength(2);

    expect(orders).toContainEqual(order1);
    expect(orders).toContainEqual(order2);
  });
});
