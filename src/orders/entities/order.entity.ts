import { OrderDetail } from "src/orderDetails/entities/order-detail.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({
    name: 'orders'
})
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    date: Date

    @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
    orderDetail: OrderDetail

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: User
}