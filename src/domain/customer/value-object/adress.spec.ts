import Address from "./address";

describe("Adress unit tests", () => {
    it("should create a address", () => {
        const address = new Address("Rua 1", 123, "Cidade", "Estado", 123);
        expect(address).toBeDefined();
    });

    it("should throw error when street is empty", () => {
        expect(() => {
            new Address("", 123, "Cidade", "Estado", 123);
        }).toThrow("Street is required");
    });

    it("should throw error when number is empty", () => {
        expect(() => {
            new Address("Rua 1", undefined, "Cidade", "Estado", 123);
        }).toThrow("Number is required");
    });

    it("should throw error when city is empty", () => {
        expect(() => {
            new Address("Rua 1", 123, "", "Estado", 123);
        }).toThrow("City is required");
    });

    it("should throw error when state is empty", () => {
        expect(() => {
            new Address("Rua 1", 123, "Cidade", "", 123);
        }).toThrow("State is required");
    });

    it("should throw error when zip is empty", () => {
        expect(() => {
            new Address("Rua 1", 123, "Cidade", "Estado", 0);
        }).toThrow("Zip is required");
    });

});