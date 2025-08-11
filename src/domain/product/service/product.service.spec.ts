import Product from "../entity/product";
import OrderService from "./product.service";

describe("Product service unit tests", () => {
  it("should change the prices of all products", () => {
    const product1 = new Product("1", "Product 1", 10);
    const product2 = new Product("2", "Product 2", 20);

    const products = [product1, product2];

    OrderService.increasePrice(products, 10);

    expect(product1.price).toBe(11);
    expect(product2.price).toBe(22);
  });

  it("should throw error when percentage is less than zero", () => {
    expect(() => {
      const product1 = new Product("1", "Product 1", 10);
      const product2 = new Product("2", "Product 2", 20);
      const products = [product1, product2];
      OrderService.increasePrice(products, -1);
    }).toThrow("Percentage must be greater than zero");
  });

  it("should throw error when list products is empty", () => {
    expect(() => {
      OrderService.increasePrice([], 10);
    }).toThrow("Products is required");
  });
});
