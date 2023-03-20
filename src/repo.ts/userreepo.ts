import { AppDataSource } from "../db";

import { User } from "../entity/userEntity";
import { SessionStore } from "../entity/session";

export const Userrepo = AppDataSource.getRepository(User);
export const Sessionrepo = AppDataSource.getRepository(SessionStore);
