import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from "./create.customer.dto";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/entity/address";

export default class CreateCustomerUseCase {

    private customerRepositor: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepositor = customerRepository;
    }

    async execute(input: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {
        const customer = CustomerFactory.createWithAddress(input.name,
            new Address(
                input.address.street,
                input.address.number,
                input.address.zip,
                input.address.city
            )
        );

        await this.customerRepositor.create(customer);

        const customerCreated: OutputCreateCustomerDTO =  {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                number: customer.Address.number,
                zip: customer.Address.zip,
                city: customer.Address.city,
            }
            
        }

        return customerCreated;
    }


}