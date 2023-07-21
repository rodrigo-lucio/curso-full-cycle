import Address from "./address";

export default class Customer {

    private _id: string;
    private _address!: Address;
    private _name: string;
    private _active: boolean = false;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate(); //A entidade sempre deve se auto-validar
    }

    validate() {
        this.validateName();
        this.validateId();
    }

    private validateName() {
        if (this._name.length === 0) {
            throw Error("Name is required");
        }
        //Poderia validar se é nome completo
        //Etc.,..
    }

    private validateId() {
        if (this._id.length === 0) {
            throw Error("Id is required");
        }
    }

    changeName(name: string) { //Mudança de regra, o porque o negocio existe. Expressa o negócio. Usar isso ao invés de setName
        //Valida se o nome está em branco
        //Valida se tem nome e sobrenome
        //O estado atual da entidade precisa estar sempre correto e válido

        //Para depois mudar o nome
        this._name = name;
        this.validateName();
    }

    activate() {  // Aqui a mesma coisa
        if (this._address == undefined) {
            throw new Error("Addres is mandatory to activate a customer");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    set Address(address: Address) {
        this._address = address;
    }

    get name() {
        return this._name;
    }

    isActive(): boolean {
       return this._active
    }

}

// let customer = new Customer("ID").; ERRADO=Isso não pode, pois uma entidade sem nome não é valida
// Quando temos uma entidade criada, o DDD diz que neste momento temos que confiar 100% no estado atual do objeto. Ele tem que estar válido
// Nao adianta dar um new e depois setar o nome. Obrigatoriamente temos que ter no construtor