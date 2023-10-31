import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: "Rodrigo",
    address: {
        street: "Rua Silva",
        number: "223",
        zip: "89500000",
        city: "Caçadora"    
    }
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn()
    }
}

describe("Unit test create customer use case", () => {

    it("should create a customer", async() => {
        
        const customerRepository = MockRepository();
        const customerCreateUsercase = new CreateCustomerUseCase(customerRepository);
        
        const output = await customerCreateUsercase.execute(input);
        
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city,
            }
        });
    });
    
    it("should throw an error when name is missing", async() => {
        const customerRepository = MockRepository();
        const customerCreateUsercase = new CreateCustomerUseCase(customerRepository);
        input.name = "";
        await expect(customerCreateUsercase.execute(input)).rejects.toThrow(
            "Name is required"
        );
        
    });

    it("should throw an error when street is missing", async() => {
        const customerRepository = MockRepository();
        const customerCreateUsercase = new CreateCustomerUseCase(customerRepository);
        input.address.street = "";
        await expect(customerCreateUsercase.execute(input)).rejects.toThrow(
            "Street is required"
        );
        
    });
});