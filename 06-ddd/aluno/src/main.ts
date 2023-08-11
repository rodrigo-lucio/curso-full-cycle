import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";
import Address from "./domain/customer/entity/address";
import Customer from "./domain/customer/entity/customer";

//Agregado 1
let customer = new Customer("123", "Rodrigo Lúcio");
const address = new Address("Rua Dois", "2", "89500000", "Caçador");
customer.Address = address;
customer.activate();


//Agregado 2
//Quando está no mesmo agreado, passamos a entidade inteira (items na ordem)
///Quando está em agregados diferentes, passamos apenas o ID para se relacionarem
let item1 = new OrderItem("1", "1", "Item 1", 1, 10);
let item2 = new OrderItem("2", "2", "Item 2", 2, 20);
let order = new Order("1", "123", [item1, item2]);

