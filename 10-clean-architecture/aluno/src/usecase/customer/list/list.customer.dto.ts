export default interface InputListCustomerDTO {
}

export type Customer = {
    id: string;
    name: string;
    address: {
        street: string;
        number: string;
        zip: string;
        city: string;
    } 
}

export default interface OutputListCustomerDTO {
    customers: Customer[]; 
}

