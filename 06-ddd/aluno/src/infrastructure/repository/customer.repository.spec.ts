import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import Customer from "../../domain/customer/entity/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/customer/entity/address";

describe("Customer repository test", () => {

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

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1234", "Customer 1");
        const address = new Address("Street 1", "345-B", "89500000", "Caçador");
        customer.Address = address;
        customer.activate();
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: customer.id} });
       
        expect(customerModel.toJSON()).toStrictEqual({
            id: "1234",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: customer.Address.street,
            number: customer.Address.number,
            zipcode: customer.Address.zip,
            city: customer.Address.city,
        });

    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1234", "Customer 1");
        const address = new Address("Street 1", "345-B", "89500000", "Caçador");
        customer.Address = address;
        customer.activate();
        await customerRepository.create(customer);

        customer.changeName("Customer 2");
        await customerRepository.update(customer);
        const customerModel = await CustomerModel.findOne({ where: { id: "1234" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1234",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
        });
   
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1234", "Customer 1");
        const address = new Address("Street 1", "345-B", "89500000", "Caçador");
        customer.Address = address;
        customer.activate();
        await customerRepository.create(customer);
        
        const customerResult = await customerRepository.findById(customer.id);

        expect(customer).toStrictEqual(customerResult);

    });


    it("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();
        expect(async () => {
            await customerRepository.findById("898888");
        }).rejects.toThrow("Customer not found");
    });


    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("1234", "Customer 1");
        const address = new Address("Street 1", "345-B", "89500000", "Caçador");
        customer1.Address = address;
        customer1.activate();
        customer1.addRewardPoints(10);
        await customerRepository.create(customer1);
        
        const customer2 = new Customer("1235", "Customer 2");
        const address2 = new Address("Street 2", "345-B", "89500000", "Caçador");
        customer2.Address = address2;
        customer2.activate();
        customer2.addRewardPoints(20);
        await customerRepository.create(customer2);

        const foundCustomers = await customerRepository.findAll();

        const customers = [customer1, customer2];

        expect(customers).toEqual(foundCustomers);
        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer1);
        expect(customers).toContainEqual(customer2);
    });

});