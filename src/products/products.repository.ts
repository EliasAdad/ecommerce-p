import { Injectable } from "@nestjs/common";

Injectable()
export class ProductsRepository {
    private products = [
        {
            id: 1,
            name: "Product 1",
            description: "Description of product 1",
            price: 15.00,
            stock: true,
            imgUrl: "http://imgurl.com"
        },
        {
            id: 2,
            name: "Product 2",
            description: "Description of product 2",
            price: 28.00,
            stock: false,
            imgUrl: "http://imgurl.com"
        },
    ]

    async findAll() {
        return this.products;
    }
}