import { LabServicesApi } from "../../core/LabApi";
import { IUser } from "./IUser";

class UsersClient {

    public fetchUsers(): Promise<IUser[]> {
        return LabServicesApi.get<IUser[]>('/users').then(response => response.data);
    }

}

export default new UsersClient;