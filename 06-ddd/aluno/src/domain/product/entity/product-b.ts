import ProductInterface from "./product.interface";

export default class ProductB implements ProductInterface {
    private _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }

    validate() {
        if (this._id.length === 0) {
            throw Error("Id is required");
        }
        if (this._name.length === 0) {
            throw Error("Name is required");
        }
        if (this._price <= 0) {
            throw Error("Price must be greater than zero");
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get price() {
        return this._price * 2;
    }

    changePrice(price: number) {
        this._price = price;
        this.validate();
    }

}