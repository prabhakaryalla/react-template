import { LabServicesApi } from "../../core/LabApi";
import { IUser } from "./IUser";


export const fetchUsers = (): Promise<IUser[]> =>
    LabServicesApi.get('/users').then(response => response.data)