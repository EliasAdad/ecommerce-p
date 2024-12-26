import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';


@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) { }


  async signIn(email: string, password: string) {

    if (!email || !password) {
      return { message: "Email or password are required!", status: HttpStatus.UNAUTHORIZED }
    }

    const userExists = await this.usersRepository.findByEmail(email);

    if (!userExists || userExists.password !== password) {
      return { message: "Invalid email or password, please try again!", status: HttpStatus.UNAUTHORIZED }
    }

    const { password: _, ...withoutPw } = userExists

    return withoutPw;
  }

}
