import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }



    async create(user: CreateUserDto) {
        const newUser = await this.usersRepository.save(user);
        return newUser
    }


    async findAll(page: number = 1, limit: number = 5) {
        const users = await this.usersRepository.find();

        if (!users) return "Users not found";

        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginated = users.slice(startIndex, endIndex).map(({ password, ...rest }) => rest)

        return paginated;
    }


    async findOne(id: number) {
        const user = await this.usersRepository.findOne({ where: { id } })
        if (!user) return { error: "User not found" }

        const { password, ...withoutPw } = user;

        return withoutPw;
    }


    async findByEmail(email: string) {
        const userExists = await this.usersRepository.findOne({ where: { email } })

        // if (!userExists) return { error: "User not found" }

        return userExists;
    }


    async update(id: number, userData: UpdateUserDto) {

        const userFound = await this.usersRepository.findOne({ where: { id } })

        if (!userFound) return { error: "User not found" }

        await this.usersRepository.update(id, userData)

        const updated = await this.usersRepository.findOne({ where: { id } })

        const { password, ...withoutPw } = updated;

        return withoutPw;
    }


    async remove(id: number) {
        const user = await this.usersRepository.findOne({ where: { id } })

        if (!user) return { error: "User not found" };

        await this.usersRepository.delete(id)

        return { message: "User deleted successfully", user: user.id }
    }
}