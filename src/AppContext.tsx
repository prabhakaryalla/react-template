import React, { createContext, useState } from "react";
import { INotificationMessage } from "./layout/Notification";
import useContextWrapper from "./hooks";


interface IAppContext {
    notification: INotificationMessage |undefined ,
    addNotification: (notification:INotificationMessage) => void;
}

export const AppContext = createContext<IAppContext | null>(null);


export const useAppContext = () =>
    useContextWrapper(AppContext, {
        contextName: useAppContext.name,
        providerName: AppContextProvider.name
    })


export const AppContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [notification, setNotification] = useState<IAppContext['notification']>();
    const addNotification = (notification: INotificationMessage) => setNotification(notification);
    return <AppContext.Provider value={{notification, addNotification}}>{children}</AppContext.Provider>
}