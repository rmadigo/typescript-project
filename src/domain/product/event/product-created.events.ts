import EventInterface from "../../_shared/event/event.interface";


export default class ProductCreatedEvents implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;
  constructor(eventDate: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventDate;
  }
}
