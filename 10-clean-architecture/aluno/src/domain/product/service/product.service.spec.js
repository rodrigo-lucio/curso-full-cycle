import Product from "../entity/product";
import ProductService from "./product.service";
describe("Product service unit tests", () => {

    it("should change the prices of all products", () => {

        const product1 = new Product("1", "MI10", 1500);
        const product2 = new Product("2", "IPHONE", 2400);
        const products = [product1, product2];

        ProductService.increasePrice(products, 100);

        expect(product1.price).toBe(3000);
        expect(product2.price).toBe(4800);

    });

    // Claro que aqui se formos rodar para MUITOS registros no banco, vale mais a pena fazer uma rotina
    // específica que faça isso com um unico update, e não fazer produto a produto
    // cada situação é uma    
});