import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

Injectable()
export class ProductsRepository {
    private products = [
        {
            id: 1,
            name: "Product 1",
            description: "Description of product 1",
            price: 15.00,
            stock: 10,
            imgUrl: "http://imgurl.com"
        },
        {
            id: 2,
            name: "Product 2",
            description: "Description of product 2",
            price: 28.00,
            stock: 0,
            imgUrl: "http://imgurl.com"
        },
        {
            id: 3,
            name: "Product 3",
            description: "Description of product 3",
            price: 40.00,
            stock: 1,
            imgUrl: "http://imgurl.com"
        },
    ]

    async create(product: CreateProductDto) {
        let id = this.products.length + 1;
        this.products = [...this.products, { id, ...product }]

        return { id }
    }

    async findAll(page: number = 1, limit: number = 5) {
        if (!this.products.length) return "There's no products to show"

        const inStock = this.products.filter((product) => product.stock > 0)

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginated = inStock.slice(startIndex, endIndex)


        return paginated;
    }

    async findOne(id: number) {
        const product = this.products.find((product) => product.id === id);

        if (!product) return { error: "Product not found" }

        return product;
    }

    async update(id: number, data: UpdateProductDto) {
        const productIndex = this.products.findIndex((product) => product.id === id)

        if (productIndex === -1) return "Product not found or doesn't exist."

        this.products[productIndex] = { ...this.products[productIndex], ...data }

        return { updated: this.products[productIndex].id }
    }

    async remove(id: number) {
        const productIndex = this.products.findIndex((product) => product.id === id)

        if (productIndex === -1) return { error: "The product doesn't exist." }

        const [deletedProduct] = this.products.splice(productIndex, 1)

        return { deleted: deletedProduct }
    }
}