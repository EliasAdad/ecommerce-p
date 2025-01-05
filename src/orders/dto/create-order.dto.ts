import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator"
import { Product } from "src/products/entities/product.entity"

export class CreateOrderDto {

    @IsNotEmpty()
    @IsUUID()
    userId: string

    @IsArray()
    @ArrayMinSize(1)
    products: Partial<Product[]>
}