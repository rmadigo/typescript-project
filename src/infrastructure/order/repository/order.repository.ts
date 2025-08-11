import Order from "../../../domain/entity/order";
import OrderItem from "../../../domain/entity/order_item";
import OrderRepositoryInterface from "../../../domain/repository/order-repository.interface";
import RepositoryInterface from "../../../domain/repository/repositry-interface";
import OrderItemModel from "./sequelize/order-item.model";
import OrderModel from "./sequelize/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    if (entity.items.length === 0) {
      throw new Error("Error: Order must have at least one item");
    }
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          product_id: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
      { include: [{ model: OrderItemModel }] }
    );
  }

  async update(entity: Order): Promise<void> {
    if (entity.items.length === 0) {
      throw new Error("Error: Order must have at least one item");
    }
    // 1. Atualizar a ordem
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
      },
      {
        where: { id: entity.id },
      }
    );

    // 2. Remover itens antigos
    await OrderItemModel.destroy({
      where: { order_id: entity.id },
    });

    // 3. Adicionar itens novos
    const items = entity.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      product_id: item.productId,
      order_id: entity.id,
    }));

    await OrderItemModel.bulkCreate(items);
  }

  async findOne(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        include: ["items"],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    const items = orderModel.items.map((item) => new OrderItem(item.id, item.name, item.product_id, item.price, item.quantity));

    const order = new Order(orderModel.id, orderModel.customer_id, items);

    return order;
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({ include: ["items"] });
    return orders.map(
      (order) =>
        new Order(
          order.id,
          order.customer_id,
          order.items.map((item) => new OrderItem(item.id, item.name, item.product_id, item.price, item.quantity))
        )
    );
  }
}
