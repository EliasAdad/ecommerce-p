import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
import { Category } from "src/categories/entities/category.entity";
import * as data from '../utils/seeders/products.json'


@Injectable()
export class ProductsRepository {
    constructor(@InjectRepository(Product) private productsRepository: Repository<Product>,
        @InjectRepository(Category) private categoriesRepository: Repository<Category>
    ) { }



    async create(product: CreateProductDto) {
        const newProduct = await this.productsRepository.save(product)

        return newProduct;
    }


    async findAll(page: number = 1, limit: number = 5) {

        const products = await this.productsRepository.find()

        if (!products) return "There's no products to show"

        const inStock = products.filter((product) => product.stock > 0)

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginated = inStock.slice(startIndex, endIndex)


        return paginated;
    }


    async addProductsSeeder() {

        const categories = await this.categoriesRepository.find()

        if (!categories) return { error: "Categories not found." }

        data?.map(async (element) => {
            const relatedCategory = categories.find((category) => category.name === element.category)

            const newProduct = new Product()

            newProduct.name = element.name
            newProduct.description = element.description
            newProduct.price = Number(element.price.toFixed(2))
            newProduct.stock = element.stock
            newProduct.category = relatedCategory

            await this.productsRepository.createQueryBuilder()
                .insert()
                .into(Product)
                .values(newProduct)
                .orUpdate(["description", "price", "stock"], ["name"],)
                .execute()

        })


        return { message: "Products added successfully!" }
    }


    async findOne(id: string) {
        const product = await this.productsRepository.findOne({ where: { id } })

        if (!product || product.stock === 0) return { error: "Product not found or it's out of stock." }

        return product;
    }


    async update(id: string, data: UpdateProductDto) {
        const foundProduct = await this.productsRepository.findOne({ where: { id } })

        if (!foundProduct) return { error: "Product not found or doesn't exist." }

        await this.productsRepository.update(id, data)

        return await this.productsRepository.findOne({ where: { id } })
    }


    async remove(id: string) {
        const foundProduct = await this.productsRepository.findOne({ where: { id } })

        if (!foundProduct) return { error: "Product not found or doesn't exist" }

        await this.productsRepository.delete(id)

        return { message: "Product removed successfully!" }
    }
}