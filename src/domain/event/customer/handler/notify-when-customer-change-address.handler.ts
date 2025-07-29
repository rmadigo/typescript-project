import EventHandlerInterface from "../../_shared/event-handler.interface";
import CustomerChangedAddressEvent from "../customer-changed-address.event";

export default class NotifyWhenCustomerChangeedAddressHandler implements EventHandlerInterface<CustomerChangedAddressEvent> {
  handle(event: CustomerChangedAddressEvent): void {
    const { id, name, address } = event.eventData;
    const { street, number, city, state, zip } = address;
    console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${street}, ${number}, ${city}, ${state}, ${zip}`);
  }
}
