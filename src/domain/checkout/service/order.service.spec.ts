import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
  it("should place an order", () => {
    const customer = new Customer("1", "Fulano");
    const item1 = new OrderItem("1", "Item 1", "2", 10, 2);
    const item2 = new OrderItem("2", "Item 2", "2", 20, 1);
    const order = OrderService.placeOrder(customer, [item1, item2]);
    expect(customer.rewardPoints).toBe(20);
    expect(order.total()).toBe(40);
  });
  it("should get total of all orders", () => {
    const item1 = new OrderItem("1", "Item 1", "2", 10, 2);
    const item2 = new OrderItem("2", "Item 2", "2", 20, 1);
    const order1 = new Order("1", "1", [item1, item2]);

    const item3 = new OrderItem("3", "Item 3", "2", 30, 3);
    const item4 = new OrderItem("4", "Item 4", "2", 40, 4);
    const order2 = new Order("2", "1", [item3, item4]);

    const item5 = new OrderItem("5", "Item 5", "2", 50, 5);
    const item6 = new OrderItem("6", "Item 6", "2", 60, 6);
    const order3 = new Order("3", "1", [item5, item6]);

    const total = OrderService.total([order1, order2, order3]);
    expect(total).toBe(900);
  });
});
