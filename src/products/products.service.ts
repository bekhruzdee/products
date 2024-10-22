import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async create(
    product: Partial<Product>,
  ): Promise<{ message: string; product: Product }> {
    const newProduct = await this.productsRepository.save(product);
    return {
      message: 'Product successfully created',
      product: newProduct,
    };
  }

  async update(
    id: number,
    product: Partial<Product>,
  ): Promise<{ message: string; product: Product }> {
    await this.productsRepository.update(id, product);
    const updatedProduct = await this.productsRepository.findOne({
      where: { id },
    });
    return {
      message: 'Product successfully updated',
      product: updatedProduct,
    };
  }

  async delete(id: number): Promise<{ message: string }> {
    await this.productsRepository.delete(id);
    return { message: 'Product successfully deleted' };
  }

  async findAll(): Promise<{ message: string; products: Product[] }> {
    const products = await this.productsRepository.find();
    return {
      message: 'Products successfully retrieved',
      products,
    };
  }

  async findOneById(
    id: number,
  ): Promise<{ message: string; product: Product }> {
    const product = await this.productsRepository.findOne({ where: { id } });
    return {
      message: 'Product found',
      product,
    };
  }

  async findOneByName(
    name: string,
): Promise<{ message: string; product: Product }> {
    const product = await this.productsRepository.findOne({ where: { name } });
    if (!product) {
        throw new Error('Product not found');
    }
    return {
        message: 'Product found',
        product,
    };
}


  async filterByPrice(
    min: number,
    max: number,
  ): Promise<{ message: string; products: Product[] }> {
    const products = await this.productsRepository
      .createQueryBuilder('product')
      .where('product.price >= :min', { min })
      .andWhere('product.price <= :max', { max })
      .getMany();

    return {
      message: 'Products successfully filtered by price',
      products,
    };
  }

  async countInStock(): Promise<{ message: string; totalQuantity: number }> {
    const products = await this.productsRepository.find();
    const totalQuantity = products.reduce(
      (sum, product) => sum + product.quantity,
      0,
    );
    return {
      message: 'Total products quantity calculated',
      totalQuantity,
    };
  }
}
