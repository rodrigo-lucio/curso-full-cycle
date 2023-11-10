import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notificaton.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "./address";

export default class Customer extends Entity {

    private _address!: Address;
    private _name: string;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this._id = id;
        this._name = name;
        this.validate(); //A entidade sempre deve se auto-validar
        if(this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }            
    }

    validate() {
        CustomerValidatorFactory.create().validate(this);
    }

    changeName(name: string) { //Mudança de regra, o porque o negocio existe. Expressa o negócio. Usar isso ao invés de setName
        //Valida se o nome está em branco
        //Valida se tem nome e sobrenome
        //O estado atual da entidade precisa estar sempre correto e válido

        //Para depois mudar o nome
        this._name = name;
        this.validate();
        if(this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }       
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

    changeAddress(address: Address) {
        this._address = address;
    }

    get Address() {
        return this._address;
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

    get rewardPoints() {
        return this._rewardPoints;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

}

// let customer = new Customer("ID").; ERRADO=Isso não pode, pois uma entidade sem nome não é valida
// Quando temos uma entidade criada, o DDD diz que neste momento temos que confiar 100% no estado atual do objeto. Ele tem que estar válido
// Nao adianta dar um new e depois setar o nome. Obrigatoriamente temos que ter no construtor