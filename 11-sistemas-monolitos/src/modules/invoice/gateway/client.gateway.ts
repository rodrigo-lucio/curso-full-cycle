import Invoice from "../domain/invoice.entity";

export default interface InvoiceGateway {
    add(client: Invoice): Promise<void>;
    find(id: string): Promise<Invoice>;
}