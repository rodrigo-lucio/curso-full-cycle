import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/entity/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "Rodrigo");
const addres = new Address("Rua teste", "222A", "89500000", "Caçador");
customer.changeAddress(addres);

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn().mockReturnValue(Promise.resolve(customer))
    }
}

describe("Unit Test find customer usecase", () => {

    it("should find a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: "123"
        }
        
        const output = {
            id: "123",
            name: "Rodrigo",
            address : {
                street: "Rua teste",
                city: "Caçador",
                number: "222A",
                zip: "89500000",
            }
        }

        const result = await usecase.execute(input);
        expect(result).toEqual(output);

    });

    it("should not find a customer", async () => {
        const customerRepository = MockRepository();
        customerRepository.findAll.mockImplementation(() => {
            throw new Error("Customer not found a");
        })
        
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: "123"
        }
        
        expect(() => {
            return usecase.execute(input);

        }).rejects.toThrow("Customer not found")
    });

})