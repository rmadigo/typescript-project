import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

let customer = new Customer("1", "Fulano");
const address = new Address("Rua 1", 3, "Cidade", "Estado", 123);

customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem("1", "Item 1", "10", 30, 20);
const item2 = new OrderItem("2", "Item 2", "2", 20, 3);
const order = new Order("1", "1", [item1, item2]);

console.log(customer);
console.log(order);
