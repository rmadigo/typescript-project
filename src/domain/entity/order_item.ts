export default class OrderItem {
  private _id: string;
  private _productId: string;
  private _name: string;
  private _quantity: number;
  private _price: number;

  constructor(id: string, name: string, pruductId: string, price: number, quantity: number) {
    this._id = id;
    this._name = name;
    this._productId = pruductId;
    this._price = price;
    this._quantity = quantity;

    this.validate();
  }

  get price(): number {
    return this._price;
  }

  get quantity(): number {
    return this._quantity;
  }

  get name(): string {
    return this._name;
  }

  get productId(): string {
    return this._productId;
  }

  get id(): string {
    return this._id;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
    if (this._price <= 0) {
      throw new Error("Price must be greater than zero");
    }
    if (this._quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }
    if (this._productId.length === 0) {
      throw new Error("ProductId is required");
    }
  }
}
