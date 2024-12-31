import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
@Entity({
    name: 'products'
})
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    price: number

    @Column()
    stock: boolean

    @Column()
    imgUrl: string
}
