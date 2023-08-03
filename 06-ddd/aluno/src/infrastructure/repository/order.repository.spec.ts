import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import Customer from "../../domain/entity/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/entity/address";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepository from "./order.repository";
import OrderModel from "../db/sequelize/model/order.model";

describe("Order repository test", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: "memory",
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

        const orderModel = await OrderModel.findOne({
            where: {id : order.id},
            include: ["items"]
        });

        console.log(orderModel.toJSON())
        expect(orderModel.toJSON()).toStrictEqual({
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

});