import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepository {
    private users = [
        {
            id: 1,
            email: "elias@mail.com",
            name: "Elias",
            password: "password123",
            address: "45th street",
            phone: "1151206007",
            country: "Argentina",
            city: "Buenos Aires"
        },
        {
            id: 2,
            email: "manuel@mail.com",
            name: "Manuel",
            password: "password123",
            address: "2nd avenue",
            phone: "1161206007",
            country: "Argentina",
            city: "Buenos Aires"
        },
    ]

    async findAll() {
        return this.users;
    }
}