import Order from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository /* implements OrderRepositoryInterface */ {

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                product_id: item.productId,
                quantity: item.quantity,
                price: item.price,
            })),
        },
        {
            include: [{model: OrderItemModel}] //Salva junto os items
        }
        );
    }

    // async update(entity: Order): Promise<void> {
    //     throw new Error("Method not implemented.");
    // }
    
    // async findById(id: string): Promise<Order> {
    //     throw new Error("Method not implemented.");
    // }

    // async findAll(): Promise<Order[]> {
    //     throw new Error("Method not implemented.");
    // }


}