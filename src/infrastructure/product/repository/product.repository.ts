
import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductModel from "./sequelize/product.model";


export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async findOne(id: string): Promise<any> {
    const product = await ProductModel.findOne({ where: { id } });
    return product;
  }

  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();
    return products.map((product) => new Product(product.id, product.name, product.price));
  }
}
