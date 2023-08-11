import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import Customer from "../../domain/customer/entity/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/customer/entity/address";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";
import OrderRepository from "./order.repository";
import OrderModel from "../db/sequelize/model/order.model";
import Product from "../../domain/product/entity/product";
import OrderItem from "../../domain/checkout/entity/order_item";
import Order from "../../domain/checkout/entity/order";

describe("Order repository test", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel, OrderModel,  OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("30", "Rodrigo");
        const addres = new Address("Rua Teste", "123", "89500000", "Caçador");
        customer.changeAddress(addres);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "IPHONE", 7000);
        await productRepository.create(product);
        const product2 = new Product("2", "MI10LITE", 2500);
        await productRepository.create(product2);

        const orderItem = new OrderItem("123", product.id, product.name, 2, product.price);
        const orderItem2 = new OrderItem("456", product2.id, product2.name, 3, product2.price);

        const orderRepository = new OrderRepository();
        const order = new Order("123", customer.id, [orderItem, orderItem2])
        await orderRepository.create(order);

        const ord = await OrderModel.findOne({
            where: {id : order.id},
            include: ["items"]
        });

        expect(ord.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name, 
                    product_id: orderItem.productId,
                    quantity: orderItem.quantity,
                    price: orderItem.price,
                    order_id: order.id
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name, 
                    product_id: orderItem2.productId,
                    quantity: orderItem2.quantity,
                    price: orderItem2.price,
                    order_id: order.id
                }
            ]
        });

    });

    it("should update a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("30", "Rodrigo");
        const addres = new Address("Rua Teste", "123", "89500000", "Caçador");
        customer.changeAddress(addres);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "IPHONE", 7000);
        await productRepository.create(product);
        const product2 = new Product("2", "MI10LITE", 2500);
        await productRepository.create(product2);

        const orderItem = new OrderItem("123", product.id, product.name, 2, product.price);
        const orderItem2 = new OrderItem("456", product2.id, product2.name, 3, product2.price);

        const orderRepository = new OrderRepository();
        const order = new Order("123", customer.id, [orderItem, orderItem2])
        await orderRepository.create(order);

        const ord = await OrderModel.findOne({
            where: {id : order.id},
            include: ["items"]
        });
        
        expect(ord.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name, 
                    product_id: orderItem.productId,
                    quantity: orderItem.quantity,
                    price: orderItem.price,
                    order_id: order.id
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name, 
                    product_id: orderItem2.productId,
                    quantity: orderItem2.quantity,
                    price: orderItem2.price,
                    order_id: order.id
                }
            ]
        });

        //Adicionando um novo item e atualizando a order
        const product3 = new Product("3", "REDMI NOTE 10", 2950);
        await productRepository.create(product3);
        const orderItem3 = new OrderItem("789", product3.id, product3.name, 3, product3.price);
        const orderToUpdate = new Order("123", customer.id, [orderItem, orderItem2, orderItem3])
        await orderRepository.update(orderToUpdate);

        const ordUpdated = await OrderModel.findOne({
            where: {id : order.id},
            include: ["items"]
        });
        
        expect(ordUpdated.toJSON()).toStrictEqual({
            id: orderToUpdate.id,
            customer_id: customer.id,
            total: orderToUpdate.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name, 
                    product_id: orderItem.productId,
                    quantity: orderItem.quantity,
                    price: orderItem.price,
                    order_id: orderToUpdate.id
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name, 
                    product_id: orderItem2.productId,
                    quantity: orderItem2.quantity,
                    price: orderItem2.price,
                    order_id: orderToUpdate.id
                },
                {
                    id: orderItem3.id,
                    name: orderItem3.name, 
                    product_id: orderItem3.productId,
                    quantity: orderItem3.quantity,
                    price: orderItem3.price,
                    order_id: orderToUpdate.id
                }
            ]
        });
    });

    it("should find by id a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("30", "Rodrigo");
        const addres = new Address("Rua Teste", "123", "89500000", "Caçador");
        customer.changeAddress(addres);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "IPHONE", 7000);
        await productRepository.create(product);
        const product2 = new Product("2", "MI10LITE", 2500);
        await productRepository.create(product2);

        const orderItem = new OrderItem("123", product.id, product.name, 2, product.price);
        const orderItem2 = new OrderItem("456", product2.id, product2.name, 3, product2.price);

        const orderRepository = new OrderRepository();
        const order = new Order("123", customer.id, [orderItem, orderItem2])
        await orderRepository.create(order);

        const orderFound = await orderRepository.findById(order.id);

        expect(order).toEqual(orderFound);

    });

    it("should throw an error when order is not found", async () => {
        const orderRepository = new OrderRepository();
        expect(async () => {
            await orderRepository.findById("898888");
        }).rejects.toThrow("Order not found");
    });

    it("should find all orders", async () => {
        //Order 1
        const customerRepository = new CustomerRepository();
        const customer = new Customer("30", "Rodrigo");
        const addres = new Address("Rua Teste", "123", "89500000", "Caçador");
        customer.changeAddress(addres);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        
        const product = new Product("1", "IPHONE", 7000);
        await productRepository.create(product);
        const product2 = new Product("2", "MI10LITE", 2500);
        await productRepository.create(product2);

        const orderItem = new OrderItem("123", product.id, product.name, 2, product.price);
        const orderItem2 = new OrderItem("456", product2.id, product2.name, 3, product2.price);

        const orderRepository = new OrderRepository();
        const order = new Order("123", customer.id, [orderItem, orderItem2])
        await orderRepository.create(order);

        //Order 2
        const customer2 = new Customer("32", "Danielly");
        const addres2 = new Address("Rua Abdalla", "444", "89500000", "Caçador");
        customer2.changeAddress(addres2);
        await customerRepository.create(customer2);
        
        const product3 = new Product("4", "GALAXY", 3321);
        await productRepository.create(product3);
        const product4 = new Product("5", "IPAD", 7132);
        await productRepository.create(product4);

        const orderItem3 = new OrderItem("789", product3.id, product3.name, 2, product3.price);
        const orderItem4 = new OrderItem("890", product4.id, product4.name, 3, product4.price);

        const order2 = new Order("456", customer.id, [orderItem3, orderItem4])
        await orderRepository.create(order2);

        const allOrders = await orderRepository.findAll();

        const orders = [order, order2];

        expect(orders).toEqual(allOrders);
        expect(allOrders).toHaveLength(2);
        expect(orders).toEqual(allOrders);
        expect(orders).toContainEqual(order);
        expect(orders).toContainEqual(order2);
        expect(orders[0].items).toEqual(allOrders[0].items);
        expect(orders[1].items).toEqual(allOrders[1].items);

    });

});