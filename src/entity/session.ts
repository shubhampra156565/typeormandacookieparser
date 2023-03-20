import { Entity,PrimaryColumn, PrimaryGeneratedColumn, Column, Unique } from "typeorm"

@Entity()
@Unique(["session_id"])
export class SessionStore {
    @PrimaryColumn()
    user_id : number 

    @Column()
    email: string

    @Column()
    session_id : string 

}