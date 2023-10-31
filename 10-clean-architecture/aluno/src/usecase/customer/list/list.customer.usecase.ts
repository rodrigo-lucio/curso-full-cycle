import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import InputListCustomerDTO from "./list.customer.dto";
import OutputListCustomerDTO from "./list.customer.dto";

export default class ListCustomerUseCase {

    private customerRepositor: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepositor = customerRepository;
    }

    async execute(input: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
        const customers = await this.customerRepositor.findAll();
        return OutputMapper.toOutput(customers);
    }

}

class OutputMapper {
    static toOutput(customer: Customer[]): OutputListCustomerDTO {
        return {
            customers: customer.map((customer) => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.Address.street,
                    city: customer.Address.city,
                    number: customer.Address.number,
                    zip: customer.Address.zip,
                }
            })),
        }
    }
}