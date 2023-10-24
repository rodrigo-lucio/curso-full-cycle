import Order from "../entity/order";
import OrderItem from "../entity/order_item";

export default class OrderFactory {
    public static create(props: OrderFactoryProps): Order {
        const orderItems: OrderItem[] = props.items.map(item => {
            return new OrderItem(
                item.id,
                item.productId,
                item.name,
                item.quantity,
                item.price
            );
        });
        return new Order(props.id, props.customerId, orderItems);
    }

}

interface OrderFactoryProps {
    id: string,
    customerId: string;
    items: {
        id: string;
        name: string;
        productId: string;
        quantity: number,
        price: number
    }[]
}