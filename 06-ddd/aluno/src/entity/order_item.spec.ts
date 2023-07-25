import Order from "./order";
import OrderItem from "./order_item";

describe("Order item unit tests", () => {

    it("should throw error if the item quantity is less or equal zero", () => {
        expect(() => {
            let item1 = new OrderItem("1", "p1", "MI10 LITE", 0, 1000);
        }).toThrowError("Quantity must be greater than 0");
    });

    it("should throw error if the item quantity is less or equal zero", () => {
        expect(() => {
            let item1 = new OrderItem("", "p1", "MI10 LITE", 1, 1000);
        }).toThrowError("Id is required");
    });

    it("should throw error if the item quantity is less or equal zero", () => {
        expect(() => {
            let item1 = new OrderItem("1", "", "MI10 LITE", 1, 1000);
        }).toThrowError("ProductId is required");
    });

    it("should calculate total", () => {
        let item = new OrderItem("2", "p2", "IPOHONE", 2, 1500);
        expect(item.orderItemTotal()).toBe(3000);
    });


});