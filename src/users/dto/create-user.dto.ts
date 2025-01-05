import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    @MinLength(8)
    @MaxLength(15)
    password: string

    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string

    @IsNotEmpty()
    @IsNumber()
    phone: number

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country?: string | undefined

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city?: string | undefined
}
