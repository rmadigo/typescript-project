import EventDispatcher from "../../_shared/event/event-dispatcher";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerChangedAddressEvent from "./customer-changed-address.event";
import CustomerCreatedEvents from "./customer-created.events";
import ConsoleLogOneHandler from "./handler/console-log-one.hadler";
import ConsoleLogTwoHandler from "./handler/console-log-two.hadler";
import NotifyWhenCustomerChangeedAddressHandler from "./handler/notify-when-customer-change-address.handler";

describe("Customer event tests", () => {
  it("Customer created event", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandlerOne = new ConsoleLogOneHandler();
    const eventHandlerTwo = new ConsoleLogTwoHandler();
    const spyEventHandlerOne = jest.spyOn(eventHandlerOne, "handle");
    const spyEventHandlerTwo = jest.spyOn(eventHandlerTwo, "handle");

    eventDispatcher.register("CustomerCreatedEvents", eventHandlerOne);
    eventDispatcher.register("CustomerCreatedEvents", eventHandlerTwo);

    const customerCreatedEvent = new CustomerCreatedEvents({
      name: "Customer 1",
    });
    eventDispatcher.notify(customerCreatedEvent);
    expect(spyEventHandlerOne).toHaveBeenCalled();
    expect(spyEventHandlerTwo).toHaveBeenCalled();
  });
  it("Should Console logs One correctly message", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new ConsoleLogOneHandler();
    const consoleSpy = jest.spyOn(console, "log");

    eventDispatcher.register("CustomerCreatedEvents", eventHandler);
    const customerCreatedEvent = new CustomerCreatedEvents({
      name: "Customer 1",
    });

    eventDispatcher.notify(customerCreatedEvent);
    expect(consoleSpy).toHaveBeenCalledWith("Esse é o primeiro console.log do evento: CustomerCreated");
  });

  it("Should Console logs Two correctly message", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new ConsoleLogTwoHandler();
    const consoleSpy = jest.spyOn(console, "log");

    eventDispatcher.register("CustomerCreatedEvents", eventHandler);
    const customerCreatedEvent = new CustomerCreatedEvents({
      name: "Customer 1",
    });

    eventDispatcher.notify(customerCreatedEvent);
    expect(consoleSpy).toHaveBeenCalledWith("Esse é o segundo console.log do evento: CustomerCreated");
  });

  it("Should notify change event customer change address", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new NotifyWhenCustomerChangeedAddressHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    const customer = new Customer("1", "Customer 1");

    customer.changeAddress(new Address("Street 1", 123, "City 1", "State", 13330));

    eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);
    const customerChangedAddressEvent = new CustomerChangedAddressEvent(customer);

    eventDispatcher.notify(customerChangedAddressEvent);
    expect(spyEventHandler).toHaveBeenCalled();
  });
});
