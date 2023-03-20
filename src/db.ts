import { DataSource } from "typeorm";
import { User } from "./entity/userEntity";
import { SessionStore } from "./entity/session";
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin@123",
    database: "hedera",
    entities: [User,SessionStore],
    synchronize:true,
    logging:true
});
