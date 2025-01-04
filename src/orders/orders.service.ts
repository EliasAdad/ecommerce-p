import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { CreateOrderDto } from "./dto/create-order.dto";



@Injectable()
export class OrdersService {
    constructor(private ordersRepoitory: OrdersRepository) {

    }


    addOrder(orderData: CreateOrderDto) {
        return this.ordersRepoitory.addOrder(orderData)
    }


    getOrder(id: string) {
        return this.ordersRepoitory.getOrder(id)
    }


}