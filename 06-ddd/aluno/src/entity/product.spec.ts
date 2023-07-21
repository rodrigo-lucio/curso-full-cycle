import Order from "./order";
import OrderItem from "./order_item";
import Product from "./product";

describe("Product unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let product = new Product("", "Product 1", 100);
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let product = new Product("123", "", 100);
        }).toThrowError("Name is required");
    });

    it("should throw error when price is less than zero", () => {
        expect(() => {
            let product = new Product("123", "Produto 1", -1);
        }).toThrowError("Price must be greater than zero");
    });

    it("should change name", () => {
        let product = new Product("123", "Produto 1", 100);
        product.changeName("Produto alterado");
        expect(product.name).toBe("Produto alterado");
    });

    it("should throw error when change name to empty", () => {
        expect(() => {
            let product = new Product("123", "Produto 1", 1);
            product.changeName("");
        }).toThrowError("Name is required");
    });

    it("should change price", () => {
        let product = new Product("123", "Produto 1", 100);
        product.changePrice(200);
        expect(product.price).toBe(200);
    });


});