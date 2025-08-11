
import EventHandlerInterface from "../../../_shared/event/event-handler.interface";
import CustomerCreatedEvents from "../customer-created.events";

export default class ConsoleLogTwoHandler implements EventHandlerInterface<CustomerCreatedEvents> {
  handle(event: CustomerCreatedEvents): void {
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}
