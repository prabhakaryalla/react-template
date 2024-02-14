
import React, { createContext, useState } from "react";
import { INotificationMessage } from "./layout/Notification";
import IConfigModel from "./config/IConfigModel";
import useContextWrapper from "./hooks";


interface IAppContext {
    notification: INotificationMessage | undefined,
    setNotification: React.Dispatch<React.SetStateAction<IAppContext['notification']>>
    config: IConfigModel | undefined,
    setConfig: React.Dispatch<React.SetStateAction<IAppContext['config']>>
}


export const AppContext = createContext<IAppContext | null>(null);


export const useAppContext = () =>
    useContextWrapper(AppContext, {
        contextName: useAppContext.name,
        providerName: AppContextProvider.name
    })



export const AppContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [notification, setNotification] = useState<IAppContext['notification']>(undefined);
    const [config, setConfig] = useState<IAppContext['config']>();
    const value = React.useMemo(() => ({ notification, setNotification, config, setConfig }),  [notification, config]);
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
