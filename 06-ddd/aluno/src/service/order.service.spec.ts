import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {


    it("should get total of all orders", () => {

        const item1 = new OrderItem("1", "p1", "MI10 LITE", 1, 1000.10);
        const item2 = new OrderItem("2", "p2", "IPOHONE", 2, 1500);
        const order1 = new Order("1", "2", [item1, item2]);

        const item3 = new OrderItem("1", "p1", "MI10 LITE", 1, 1343.12);
        const item4 = new OrderItem("2", "p2", "IPOHONE", 2, 4500);
        const order2 = new Order("1", "2", [item3, item4]);

        const item5 = new OrderItem("1", "p1", "MI10 LITE", 3, 2343);
        const item6 = new OrderItem("2", "p2", "IPOHONE", 5, 515);
        const order3 = new Order("1", "2", [item5, item6]);

        const total = OrderService.total([order1, order2, order3]);

        expect(total).toBe(23947.22);

    });

});