import React, { useEffect, useState } from "react";
import IConfigModel from "./IConfigModel";

//Implementted without using Reducers. 

const initalConfigModel:IConfigModel = { backendUrl : ""};

const initialconfig = {
    config: initalConfigModel,
    isLoading: true
}

const ConfigContext = React.createContext(initialconfig);

function ConfigProvider({ children}: any)
{
    const [config, setConfig] = useState(initalConfigModel);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('/config.json').then(response => {
        
            response.json().then((res) => {
                setConfig(res);
                setIsLoading(false);
            })            
          });
    }, [])

    return <ConfigContext.Provider value={{config: config, isLoading: isLoading}}>{children}</ConfigContext.Provider>;
}

export { ConfigProvider, ConfigContext };
