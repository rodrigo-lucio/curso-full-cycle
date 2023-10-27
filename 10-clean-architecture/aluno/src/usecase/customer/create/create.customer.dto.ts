export interface InputCreateCustomerDTO {
    name: string;
    address: {
        street: string;
        number: string;
        zip: string;
        city: string;
    } 
}

export interface OutputCreateCustomerDTO {
    id: string;
    name: string;
    address: {
        street: string;
        number: string;
        zip: string;
        city: string;
    } 
}