import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) { }

  create(product: CreateProductDto) {
    return this.productsRepository.create(product);
  }

  addProductsSeeder() {
    return this.productsRepository.addProductsSeeder();
  }

  findAll(page: number, limit: number) {
    return this.productsRepository.findAll(page, limit);
  }

  findOne(id: string) {
    return this.productsRepository.findOne(id);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productsRepository.update(id, updateProductDto);
  }

  remove(id: string) {
    return this.productsRepository.remove(id);
  }
}
