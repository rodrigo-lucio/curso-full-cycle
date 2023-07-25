import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "", []);
        }).toThrowError("Id is required");
    });

    it("should throw error when customer id is empty", () => {
        expect(() => {
            let order = new Order("1", "", []);
        }).toThrowError("CustomerId is required");
    });

    it("should throw error when customer id is empty", () => {
        expect(() => {
            let order = new Order("1", "2", []);
        }).toThrowError("Items quantity must be greater than 0");
    });

    it("should calculate total", () => {
        let item1 = new OrderItem("1", "MI10 LITE", 1, 1000);
        let item2 = new OrderItem("2", "IPOHONE", 2, 1500);
        let order = new Order("1", "2", [item1, item2]);
        expect(order.total()).toBe(4000);
    });

});