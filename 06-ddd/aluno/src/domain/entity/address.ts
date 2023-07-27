export default class Address { //Value object. Os dados não são alterados, apenas trocados pela entidade
    _street: string = "";
    _number: string = "";
    _zip: string = "";
    _city: string = "";

    constructor(street: string, number: string, zip: string, city: string) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;
        this.validate();
    }

    validate() {
        if (this._street.length == 0) {
            throw new Error("Street is required");
        }

        if (this._number.length == 0) {
            throw new Error("Number is required");
        }

        if (this._zip.length == 0) {
            throw new Error("Zip is required");
        }

        if (this._city.length == 0) {
            throw new Error("City is required");
        }

    }
}
