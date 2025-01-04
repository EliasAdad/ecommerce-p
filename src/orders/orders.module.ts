import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { OrderDetail } from "src/orderDetails/entities/order-detail.entity";
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { OrdersRepository } from "./orders.repository";



@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderDetail, Product, User])],
    controllers: [OrdersController],
    providers: [OrdersService, OrdersRepository]
})
export class OrdersModule { }