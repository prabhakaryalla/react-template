import { IUser } from "../IUser";

const user1: IUser = jest.genMockFromModule('../IUser');
user1.id = 1;
user1.email = "test1@gmail.com"
user1.name = "test1";
user1.phone = "11111111111",
user1.website = "test1.com";

const user2: IUser = jest.genMockFromModule('../IUser');
user2.id = 2;
user2.email = "test2@gmail.com"
user2.name = "test2";
user2.phone = "2222222",
user2.website = "test2.com";

const usersMocked = [
    user1,
    user2
]

export const UsersMock = usersMocked;
