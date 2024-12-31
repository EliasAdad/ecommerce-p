import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column()
    email: string

    @Column()
    name: string

    @Column()
    password: string

    @Column()
    address: string

    @Column()
    phone: number

    @Column()
    country?: string | undefined

    @Column()
    city?: string | undefined
}
