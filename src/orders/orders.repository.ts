import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Repository } from "typeorm";
import { OrderDetail } from "src/orderDetails/entities/order-detail.entity";
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { CreateOrderDto } from "./dto/create-order.dto";


@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Order) private ordersRepository: Repository<Order>,
        @InjectRepository(OrderDetail) private orderDetailRepository: Repository<OrderDetail>,
        @InjectRepository(Product) private productsRepository: Repository<Product>,
        @InjectRepository(User) private usersRepository: Repository<User>
    ) { }



    async addOrder(orderData: CreateOrderDto) {

        const { userId, products } = orderData;

        let total: number = 0


        const foundedUser = await this.usersRepository.findOneBy({ id: userId })

        if (!foundedUser) return { error: "User not found or doesn't exist." }

        const newOrder = new Order()
        newOrder.date = new Date()
        newOrder.user = foundedUser

        await this.ordersRepository.save(newOrder)

        const productsArray = await Promise.all(

            products.map(async (element) => {

                const prod = await this.productsRepository.findOne({ where: { id: element.id } })

                if (prod.stock > 0) {

                    total += Number(prod.price)

                    await this.productsRepository.update({ id: element.id }, { stock: prod.stock - 1 })

                    return prod
                }

            })
        )

        const newOrderDetail = new OrderDetail()
        newOrderDetail.price = Number(total.toFixed(2))
        newOrderDetail.products = productsArray
        newOrderDetail.order = newOrder

        await this.orderDetailRepository.save(newOrderDetail)

        return await this.ordersRepository.findOne({
            where: { id: newOrder.id },
            relations: {
                orderDetail: true
            }
        })

    }


    async getOrder(id: string) {


        const order = await this.ordersRepository.findOne({
            where: { id }, relations: {
                orderDetail: {
                    products: true
                }
            }
        })

        if (!order) return { error: "Order doesn't exist" }

        return order;
    }


}