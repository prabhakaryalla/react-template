import { LabServicesApi } from "../../core/LabApi";
import { IUser } from "./IUser";

class UsersClient {
    fetchUsers = (): Promise<IUser[]> => LabServicesApi.get<IUser[]>('/users').then(response => response.data);
    editUser = (user: IUser) => LabServicesApi.put(`/users/${user?.id}`, JSON.stringify(user))
    addUser = (user: IUser) => LabServicesApi.post(`/users`, JSON.stringify(user))
    getUser = (id: string): Promise<IUser> => LabServicesApi.get(`/users/${id}`).then(response => response.data);
}

export default new UsersClient;