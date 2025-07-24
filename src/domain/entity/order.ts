import OrderItem from "./order_item";

export default class Order {

  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number;

  constructor(id: string, customerID: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerID;
    this._items = items;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  set items(value: OrderItem[]) {
    this._items = value;
  }

  addItem(item: OrderItem[]) {
    this._items = this._items.concat(item);
  }

  removeItem(itemId: string) {
    this._items = this._items.filter((item) => item.id !== itemId);
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._customerId.length === 0) {
      throw new Error("Id costumer is required");
    }
    if (this._items.length === 0) {
      throw new Error("Items is required");
    }
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
}
