import OrderItem from "./order_item";

export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[] = [];
    private _total: number;

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }


    validate() {
        if (this._id.length === 0) {
            throw Error("Id is required");
        }
        if (this._customerId.length === 0) {
            throw Error("CustomerId is required");
        }
        if (this._items.length === 0) {
            throw Error("Items quantity must be greater than 0");
        }
        
    }

    total(): number {
        return this._items.reduce((acum, item) => acum + item.price, 0);
    }

}


//Não pode ser Customer objeto e sim customerId (string), pois Customer não depende de Order para existir
//Se está em agregados diferentes, usa id com string, se estão dentro do mesmo agregado, é o objeto inteiro, igual a items 
