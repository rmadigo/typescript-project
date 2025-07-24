import OrderItem from "./order_item";

describe("OrderItem unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      // (id: string, name: string, pruductId: string, price: number, quantity: number) {
      const orderItem = new OrderItem("", "Item 1", "1", 10, 2);
    }).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const orderItem = new OrderItem("1", "", "1", 10, 2);
    }).toThrow("Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const orderItem = new OrderItem("1", "Item 1", "1", -1, 2);
    }).toThrow("Price must be greater than zero");
  });

  it("should throw error when quantity is less than zero", () => {
    expect(() => {
      const orderItem = new OrderItem("1", "Item 1", "1", 10, -1);
    }).toThrow("Quantity must be greater than zero");
  });

  it("should throw error when productId is empty", () => {
    expect(() => {
      const orderItem = new OrderItem("1", "Item 1", "", 10, 2);
    }).toThrow("ProductId is required");
  });

  it("should change quantity", () => {
    const orderItem = new OrderItem("1", "Item 1", "1", 10, 2);
    expect(orderItem.quantity).toBe(2);
    orderItem.changeQuantity(3);
    expect(orderItem.quantity).toBe(3);
  });

});
