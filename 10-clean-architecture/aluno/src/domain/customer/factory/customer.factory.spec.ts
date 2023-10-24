import Address from "../entity/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {

    it("should create a customer", () => {

        let customer = CustomerFactory.create("Rodrigo");
    
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Rodrigo");
        expect(customer.Address).toBeUndefined();

    });

    it("should create a customer with an address", () => {
        const address = new Address("Street 1", "345-B", "89500000", "Caçador");
        let customer = CustomerFactory.createWithAddress("Rodrigo", address);
    
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Rodrigo");
        expect(customer.Address).toBe(address);

    });

});