export default class Address {
  _street: string;
  _number: number;
  _city: string;
  _state: string;
  _zip: number;

  constructor(street: string, number: number, city: string, state: string, zip: number) {
    this._street = street;
    this._city = city;
    this._number = number;
    this._state = state;
    this._zip = zip;

    this.validate();
  }
  get street() {
    return this._street;
  }

  get number() {
    return this._number;
  }

  get city() {
    return this._city;
  }

  get state() {
    return this._state;
  }

  get zip() {
    return this._zip;
  }

  validate() {
    if (this._street === "") {
      throw new Error("Street is required");
    }
    if (this._city === "") {
      throw new Error("City is required");
    }
    if (this._state === "") {
      throw new Error("State is required");
    }
    if (this._zip === 0) {
      throw new Error("Zip is required");
    }
    if (this._number === undefined) {
      throw new Error("Number is required");
    }
  }
}
