import Product from "../../domain/entity/product";
import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";
import RepositoryInterface from "../../domain/repository/repositry-interface";
import ProductModel from "../db/sequelize/model/product.model";

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
    const product = await ProductModel.findOne({ where: { id: id } });
    return product;
  }

  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();
    return products.map((product) => new Product(product.id, product.name, product.price));
  }
}
