import React, { createContext, useState } from "react";
import { IUser } from "./IUser";
import useContextWrapper from "../../hooks";


interface IUserContext {
    users: IUser[],
    setUsers: React.Dispatch<React.SetStateAction<IUserContext['users']>>
}

export const UserContext = createContext<IUserContext|null>(null);


export const useUserContext = () => 
    useContextWrapper(UserContext, {
        contextName: useUserContext.name,
        providerName: UserContextProvider.name
    })


export const UserContextProvider = ({children}: React.PropsWithChildren<{}>) => {
    const [users, setUsers] = useState<IUserContext['users']>([]);
    const value = React.useMemo(() => ({users, setUsers}), [users]);
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}