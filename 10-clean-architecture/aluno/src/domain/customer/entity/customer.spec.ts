import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "Rodrigo");
        }).toThrowError("customer: Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("customer: Name is required");
    });

    it("should throw error when id and name are empty", () => {
        expect(() => {
            let customer = new Customer("", "");
        }).toThrowError("customer: Id is required,customer: Name is required");
    });

    it("should change name", () => {
        let customer = new Customer("123", "Rodrigo");

        customer.changeName("Danielly");
        
        expect(customer.name).toBe("Danielly");
    });

    it("should throw error when change name to empty", () => {
        expect(() => {
            let customer = new Customer("123", "Rodrigo");

            customer.changeName("");

        }).toThrowError("Name is required");
    });


    it("should activate customer", () => {
        let customer = new Customer("123", "Rodrigo");
        const address = new Address("Rua 1", "123", "89500000", "Caçador");
        customer.Address = address;

        customer.activate();
        expect(customer.isActive()).toBe(true);

    });

    it("should throw when activate address is undefined when you activate a customer", () => {
        expect(() => {
            let customer = new Customer("123", "Rodrigo");
    
            customer.activate();
        }).toThrowError("Addres is mandatory to activate a customer");
    });


    it("should deactivate customer", () => {
        let customer = new Customer("123", "Rodrigo");

        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });

    
    it("should add reward points", () => {
        let customer = new Customer("123", "Rodrigo");

        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);

        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(15);

        expect(customer.rewardPoints).toBe(25);

    });



});