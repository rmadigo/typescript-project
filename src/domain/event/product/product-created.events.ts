import EventInterface from "../_shared/event.interface";

export default class ProductCreatedEvents implements EventInterface {
  dateTimeOccurred: Date;
  eventData: any;
  constructor(eventDate: any) {
    this.dateTimeOccurred = new Date();
    this.eventData = eventDate;
  }
}
