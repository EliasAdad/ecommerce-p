import { Category } from "src/categories/entities/category.entity"
import { OrderDetail } from "src/orderDetails/entities/order-detail.entity"
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany } from "typeorm"
@Entity({
    name: 'products'
})
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    name: string

    @Column({ type: 'text', nullable: false })
    description: string

    @Column({ type: 'decimal', scale: 2, precision: 10 })
    price: number

    @Column({ type: 'int', nullable: false })
    stock: number

    @Column({ type: 'text', default: '/Users/eliasadad/Desktop/Image-not-found.png' })
    imgUrl: string

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category: Category

    @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
    orderDetails: OrderDetail[]
}
