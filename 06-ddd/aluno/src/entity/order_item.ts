export default class OrderItem {
    private _id: string;
    private _productId: string;
    private _name: string;
    private _quantity: number;
    private _price: number;

    constructor(id: string, productId: string, name: string, quantity: number, price: number) {
        this._id = id;
        this._productId = productId;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
        this.validate();
    }

    validate() {
        if (this._id.length === 0) {
            throw Error("Id is required");
        }
        if (this._productId.length === 0) {
            throw Error("ProductId is required");
        }
        if (this._quantity <= 0) {
            throw Error("Quantity must be greater than 0");
        }
    }

    get price() {
        return this._price;
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
    }

}