import Address from "../../../domain/customer/entity/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import UpdateCustomerUseCase from "./update.customer.usecase";

let customer = CustomerFactory.createWithAddress(
                "Rodrigo", 
                new Address("Street 1", "345-B", "89500000", "Caçador"));

  
const input = {
    id: customer.id,
    name: "Rodrigo Updated",
    address: {
        street: "Street 1 updated",
        number: "223",
        zip: "89500111",
        city: "Videira"    
    }
}            

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
    }
}

describe("Unit test update customer use case", () => {

    it("should update a customer", async() => {
        
        const customerRepository = MockRepository();
        const customerUpdateUsercase = new UpdateCustomerUseCase(customerRepository);
        
        const output = await customerUpdateUsercase.execute(input);

        expect(output).toEqual(input);
    });
});

