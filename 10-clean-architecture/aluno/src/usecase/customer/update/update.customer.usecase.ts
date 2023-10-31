import Address from "../../../domain/customer/entity/address";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputUpdateCustomerDTO, OutputUpdateCustomerDTO } from "./update.customer.dto";

export default class UpdateCustomerUseCase {

    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputUpdateCustomerDTO): Promise<OutputUpdateCustomerDTO> {
        const customer = await this.customerRepository.findById(input.id);

        customer.changeName(input.name);
        customer.changeAddress(new Address(input.address.street, input.address.number, input.address.zip, input.address.city));

        await this.customerRepository.update(customer);

        const customerUpdated: OutputUpdateCustomerDTO =  {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                number: customer.Address.number,
                zip: customer.Address.zip,
                city: customer.Address.city,
            }
            
        }

        return customerUpdated;
    }


}