import { Order } from "src/orders/entities/order.entity"
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm"
@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
    email: string

    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string

    @Column({ type: 'text', nullable: false })
    password: string

    @Column({ type: 'text' })
    address: string

    @Column({ type: 'int' })
    phone: number

    @Column({ type: 'varchar', length: 50 })
    country?: string | undefined

    @Column({ type: 'varchar', length: 50 })
    city?: string | undefined

    @OneToMany(() => Order, (order) => order.user)
    @JoinColumn({ name: 'orders_id' })
    orders: Order[]
}
