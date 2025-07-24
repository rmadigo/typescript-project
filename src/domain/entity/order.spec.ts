import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("shold throw error when id is empty", () => {
    expect(() => {
      const order = new Order("", "1", []);
    }).toThrow("Id is required");
  });

  it("shold throw error when id costumer is empty", () => {
    expect(() => {
      const order = new Order("1", "", []);
    }).toThrow("Id costumer is required");
  });

  it("shold throw error when items is empty", () => {
    expect(() => {
      const order = new Order("1", "1", []);
    }).toThrow("Items is required");
  });

  it("shold calculate total", () => {
    const item1 = new OrderItem("1", "Item 1", "10", 10, 2);
    const item2 = new OrderItem("2", "Item 2", "1", 20, 1);
    const order = new Order("1", "1", [item1, item2]);
    expect(order.total()).toBe(40);
  });

  it("shold throw error if qtd is zero", () => {
    expect(() => {
      const item1 = new OrderItem("1", "Item 1", "10", 10, -2);
    }).toThrow("Quantity must be greater than zero");
  });

  it("should add item", () => {
    const item1 = new OrderItem("1", "Item 1", "10", 10, 2);
    const item2 = new OrderItem("2", "Item 2", "1", 20, 1);
    const order = new Order("1", "1", [item1]);
    expect(order.total()).toBe(20);

    order.addItem([item2]);
    expect(order.total()).toBe(40);

    expect(order.items.length).toBe(2);
  });
  it("should remove item", () => {
    const item1 = new OrderItem("1", "Item 1", "10", 10, 2);
    const item2 = new OrderItem("2", "Item 2", "1", 20, 1);
    const order = new Order("1", "1", [item1, item2]);
    expect(order.total()).toBe(40);

    order.removeItem("1");
    expect(order.total()).toBe(20);

    expect(order.items.length).toBe(1);
  });
});
