import Address from "../../../domain/customer/entity/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
    "Rodrigo",
    new Address("Street 1", "345-B", "89500000", "Caçador")
);

const customer2 = CustomerFactory.createWithAddress(
    "Danielly",
    new Address("Street 2", "346-B", "89500001", "Caçador")
);


const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        findById: jest.fn(),
    }
}

describe("Unit tests for list customer usecase", () => {

    it("should list a customer", async () => {

        const repository = MockRepository();
        const useCase = new ListCustomerUseCase(repository);
        const output= await useCase.execute(null);

        expect(output.customers.length).toBe(2);

        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.Address.street);
        expect(output.customers[0].address.number).toBe(customer1.Address.number);
        expect(output.customers[0].address.zip).toBe(customer1.Address.zip);

        expect(output.customers[1].address.city).toBe(customer2.Address.city);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.Address.street);
        expect(output.customers[1].address.number).toBe(customer2.Address.number);
        expect(output.customers[1].address.zip).toBe(customer2.Address.zip);
        expect(output.customers[1].address.city).toBe(customer2.Address.city);

        
    });


});