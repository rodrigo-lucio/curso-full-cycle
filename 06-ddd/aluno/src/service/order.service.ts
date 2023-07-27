import Order from "../entity/order";

export default class OrderService {
    static total(orders: Order[]): number {
        return orders.reduce((acum, order) => acum + order.total(), 0);
    }
}