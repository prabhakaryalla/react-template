import { LabServicesApi } from "../../core/LabApi";
import { IUser } from "./IUser";


export const fetchUsers = (): Promise<IUser[]> =>
    LabServicesApi.get<IUser[]>('/users').then(response => response.data)

export default {
    fetchUsers
}