import { v4 as uuid } from "uuid";
import OrderFactory from "./order.factory";
describe("Order factory unit tests", () => {

    it("Should create an order", () => {
        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    name: "IPHONE",
                    productId: uuid(),
                    quantity: 2,
                    price: 5200
                },
                {
                    id: uuid(),
                    name: "MI10 LITE",
                    productId: uuid(),
                    quantity: 3,
                    price: 3200
                }
            ]
        }

        const order = OrderFactory.create(orderProps);
     
        expect(order.id).toBe(orderProps.id);
        expect(order.customerId).toBe(orderProps.customerId);
        expect(order.total()).toBe(20000);
        expect(order.items.length).toBe(2);

        expect(order.items[0].id).toBe(orderProps.items[0].id);
        expect(order.items[0].name).toBe(orderProps.items[0].name);
        expect(order.items[0].productId).toBe(orderProps.items[0].productId);
        expect(order.items[0].quantity).toBe(orderProps.items[0].quantity);
        expect(order.items[0].price).toBe(orderProps.items[0].price);

        expect(order.items[1].id).toBe(orderProps.items[1].id);
        expect(order.items[1].name).toBe(orderProps.items[1].name);
        expect(order.items[1].productId).toBe(orderProps.items[1].productId);
        expect(order.items[1].quantity).toBe(orderProps.items[1].quantity);
        expect(order.items[1].price).toBe(orderProps.items[1].price);



    });



});