import Product from "../entity/product";

export default class ProductService {
  static increasePrice(products: Product[], percentage: number): void {
    if (percentage <= 0) throw new Error("Percentage must be greater than zero");
    if (products.length === 0) throw new Error("Products is required");
    products.forEach((product) => product.changePrice(product.price * (1 + percentage / 100)));
  }
}
