import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should create a customer", () => {
    const customer = new Customer("1", "Fulano");
    expect(customer).toBeDefined();
  });

  it("should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "Fulano");
    }).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Customer("1", "");
    }).toThrow("Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("1", "Fulano");
    customer.changeName("Beltrano");
    expect(customer.name).toBe("Beltrano");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "Fulano");
    customer.address = new Address("Rua 1", 12, "Cidade", "Estado", 123);
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it("should throw error when address is undefined", () => {
    expect(() => {
      const customer = new Customer("1", "Fulano");
      customer.activate();
    }).toThrow("Address is required to activate a customer");
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "Fulano");
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "Fulano");

    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
