import Order from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import RepositoryInterface from "../../domain/repository/repositry-interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
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
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
      },
      {
        where: { id: entity.id },
      }
    );

    await OrderItemModel.destroy({
      where: { order_id: entity.id },
    });

    // 3. Criar os novos itens um a um
    for (const item of entity.items) {
      await OrderItemModel.create({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        product_id: item.productId,
        order_id: entity.id,
      });
    }
  }

  async findOne(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
}
