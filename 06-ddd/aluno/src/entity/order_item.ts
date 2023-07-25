export default class OrderItem {
    private _id: string;
    private _name: string;
    private _quantity: number;
    private _price: number;

    constructor(id: string, name: string, quantity: number, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
    }

    get price() {
        return this._price;
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
    }

}