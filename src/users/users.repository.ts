import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersRepository {
    private users: User[] = [
        {
            id: 1,
            email: "elias@mail.com",
            name: "Elias",
            password: "password123",
            address: "45th street",
            phone: 1151206007,
            country: "Argentina",
            city: "Buenos Aires"
        },
        {
            id: 2,
            email: "manuel@mail.com",
            name: "Manuel",
            password: "password123",
            address: "2nd avenue",
            phone: 1161206007,
            country: "Argentina",
            city: "Buenos Aires"
        },
    ]

    async create(user: CreateUserDto) {
        let id = this.users.length + 1

        this.users = [...this.users, { id, ...user }]

        return { id }
    }


    async findAll(page: number = 1, limit: number = 5) {

        if (!this.users.length) return "Users not found";

        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginated = this.users.slice(startIndex, endIndex).map(({ password, ...rest }) => rest)

        return paginated;
    }


    async findOne(id: number) {
        const user = this.users.find((user) => user.id === id);
        if (!user) return { error: "User not found" }

        const { password, ...withoutPw } = user;

        return withoutPw;
    }


    async findByEmail(email: string) {
        const userExists = this.users.find((user) => user.email === email)

        // if (!userExists) return "User not found"

        return userExists;
    }


    async update(id: number, userData: UpdateUserDto) {

        const userIndex = this.users.findIndex((user) => user.id === id)

        if (userIndex === -1) {
            return "User not found"
        }

        this.users[userIndex] = { ...this.users[userIndex], ...userData };

        return { message: "User updated successfully!", user: this.users[userIndex].id };
    }


    async remove(id: number) {
        const userIndex = this.users.findIndex((user) => user.id === id)

        if (userIndex === -1) return "User not found";

        const [deletedUser] = this.users.splice(userIndex, 1)

        return { deleted: deletedUser.id }
    }
}