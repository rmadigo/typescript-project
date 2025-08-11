import { Sequelize } from "sequelize-typescript";
import CustomerModel from "./sequelize/customer.model";
import Customer from "../../../domain/entity/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../../domain/entity/address";
describe("Customer repository unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Fulano");
    const address = new Address("Rua 1", 123, "Cidade", "Estado", 123);
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });
    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      street: address.street,
      number: address.number,
      zip: address.zip,
      city: address.city,
      state: address.state,
      rewardPoints: 0,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Fulano");
    const address = new Address("Rua 1", 123, "Cidade", "Estado", 123);
    customer.address = address;
    await customerRepository.create(customer);

    customer.changeName("Beltrano");
    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });
    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: "Beltrano",
      active: customer.isActive(),
      street: address.street,
      number: address.number,
      zip: address.zip,
      city: address.city,
      state: address.state,
      rewardPoints: 0,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Fulano");
    const address = new Address("Rua 1", 123, "Cidade", "Estado", 123);
    customer.address = address;
    await customerRepository.create(customer);

    const customerResult = await customerRepository.findOne(customer.id);

    expect(customer).toStrictEqual(customerResult);
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("1", "Fulano");
    const address1 = new Address("Rua 1", 123, "Cidade", "Estado", 123);
    customer1.address = address1;
    await customerRepository.create(customer1);

    const customer2 = new Customer("2", "Beltrano");
    const address2 = new Address("Rua 2", 123, "Cidade", "Estado", 123);
    customer2.address = address2;
    await customerRepository.create(customer2);

    const customer3 = new Customer("3", "Ciclano");
    const address3 = new Address("Rua 3", 123, "Cidade", "Estado", 123);
    customer3.address = address3;
    await customerRepository.create(customer3);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(3);

    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
    expect(customers).toContainEqual(customer3);
  });
});
