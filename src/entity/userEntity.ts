import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"

@Entity()
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    isActive: boolean
}