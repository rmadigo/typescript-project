
import EventHandlerInterface from "../../../_shared/event/event-handler.interface";
import ProductCreatedEvents from "../product-created.events";

export default class SendEmailWhenProductItCreatedHandler implements EventHandlerInterface<ProductCreatedEvents> {
  handle(event: ProductCreatedEvents): void {
    console.log(`Sending email... Product: ${event.eventData.name}`);
  }
}
