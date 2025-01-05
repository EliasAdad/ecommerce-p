import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { AuthGuard } from "src/auth/auth.guard";



@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) { }


    @Post()
    @UseGuards(AuthGuard)
    addOrder(@Body() orderData: CreateOrderDto) {
        return this.ordersService.addOrder(orderData)
    }


    @Get(':id')
    @UseGuards(AuthGuard)
    getOrder(@Param('id', ParseUUIDPipe) id: string) {

        return this.ordersService.getOrder(id)

    }
}