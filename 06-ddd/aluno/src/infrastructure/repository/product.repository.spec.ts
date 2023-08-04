import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequelize/model/product.model";
import Product from "../../domain/entity/product";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product",async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Produto teste", 1000);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: "1"}});

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Produto teste",
            price: 1000
        });

    });

    it("should update a product",async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Produto teste", 1000);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: "1"}});

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Produto teste",
            price: 1000
        });

        product.changeName("Produto teste alterado");
        product.changePrice(1500);

        await productRepository.update(product); 

        const productModelAlterado = await ProductModel.findOne({where: {id: "1"}});

        expect(productModelAlterado.toJSON()).toStrictEqual({
            id: "1",
            name: "Produto teste alterado",
            price: 1500
        });

    });

    it("should find a product",async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Produto teste find", 1000);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: "1"}});

        const foundProduct = await productRepository.findById("1");

        expect(productModel.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: productModel.name,
            price: productModel.price
        });

    });

    it("should find all products",async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Produto 1 teste find all", 1000);
        await productRepository.create(product);
        
        const product2 = new Product("2", "Produto 2 teste find all", 2300);
        await productRepository.create(product2);

        const foundProducts = await productRepository.findAll();

        const products = [product, product2];
        expect(products).toEqual(foundProducts);
    });

});