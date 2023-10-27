import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/entity/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find customer usecase", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("123", "Rodrigo");
        const addres = new Address("Rua teste", "222A", "89500000", "Caçador");
        customer.changeAddress(addres);
        await customerRepository.create(customer);
        
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

})