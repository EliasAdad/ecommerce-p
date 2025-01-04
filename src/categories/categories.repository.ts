import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";
import * as data from '../utils/seeders/products.json'


@Injectable()
export class CategoryRepository {
    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>
    ) { }


    async addCategories() {

        for (const element of data) {

            const category = await this.categoryRepository.findOne({ where: { name: element.category } })

            if (!category) await this.categoryRepository.save({ name: element.category })
        }

        return { message: 'Categories were added successfully!' }
    }


    async getCategories() {
        return await this.categoryRepository.find()

    }
}