import { IconButton, Snackbar, SnackbarContent } from "@mui/material"
import { useState } from "react"
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from "@mui/icons-material/Close"
import { amber, blue } from "@mui/material/colors";
import { useAppContext } from "../AppContext";

export enum NotificationType {
    Error,
    Info
}

export interface INotificationMessage {
    message: string,
    type: NotificationType
}


const Notifications = () => {


    const { notification } = useAppContext();
    const [open, setOpen] = useState(notification !== undefined);

    const onCloseClick = () => {
        setOpen(false);
    }

    if (notification === undefined)
        return <></>

    const renderNotificicationIcon = (type: NotificationType) => {
        const Icon = notification.type === NotificationType.Error ? WarningIcon : InfoIcon;
        return <Icon style={{ opacity: 0.9, marginRight: '5px', verticalAlign: 'bottom' }} />;
    }



    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={open}
            autoHideDuration={6000}
            onClose={onCloseClick}
            aria-describedby="client-snackbar"
        >
            <SnackbarContent style={{ backgroundColor: notification.type == NotificationType.Error ? amber[700] : blue[700] }}
                message={
                    <span id="client-snackbar">
                        {renderNotificicationIcon(notification.type)}
                        {notification.message}
                    </span>
                }
                action={
                    <IconButton key="close" aria-label="Close" color="inherit" onClick={onCloseClick}>
                        <CloseIcon style={{ fontSize: 20 }} />
                    </IconButton>
                }


            />
        </Snackbar>
    );


}

export default Notifications;


import { IconButton, Snackbar, SnackbarContent } from "@mui/material";
// import { Close, Warning, Info } from "@mui/icons-material";
// import { amber, blue } from "@mui/material/colors";
// import React, { useEffect, useState } from "react";
// import { useAppContext } from "./AppContext";


// export enum NotificationType {
//     Error,
//     Info
// }


// export interface INotificationMessage {
//     message: string,
//     type: NotificationType
// }


// const renderNotificationIcon = (type: NotificationType) => {
//     if (type === NotificationType.Error)
//         return <Warning style={{ opacity: 0.9, verticalAlign: 'bottom', marginRight: '2px' }} />


//     return <Info style={{ opacity: 0.9, verticalAlign: 'bottom', marginRight: '5px' }} />
// }


// const Notifications: React.FC = () => {
//     const { notification, setNotification } = useAppContext();
//     const [open, setOpen] = useState<boolean>(notification === undefined);


//     useEffect(() => {
//         const isOpen = notification !== undefined ? true : false;
//         setOpen(isOpen)
//     }, [notification])


//     const onCloseClick = () => {
//         setNotification(undefined);
//         setOpen(false);
//     }


//     if (notification === undefined)
//         return <></>


//     return (
//         <Snackbar
//             anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//             open={open}
//             autoHideDuration={6000}
//             onClose={onCloseClick}
//             aria-describedby="client-snackbar">
//             <SnackbarContent style={{ backgroundColor: notification.type === NotificationType.Error ? amber[700] : blue[700] }}
//                 message={<span id="client-snackbar">
//                     {renderNotificationIcon(notification.type)}
//                     {notification.message}
//                 </span>}
//                 action={
//                     <IconButton key="close" aria-label="Close" color="inherit" onClick={onCloseClick}>
//                         <Close />
//                     </IconButton>
//                 }
//             />
//         </Snackbar>
//     );
// }


// export default Notifications;




import React, { createContext, useState } from "react";
// import useContextWrapper from "../hooks";
// import { INotificationMessage } from "./Notifications";
// import IConfigModel from "../config/IConfigModel";


// interface IAppContext {
//     notification: INotificationMessage | undefined,
//     setNotification: React.Dispatch<React.SetStateAction<IAppContext['notification']>>
//     config: IConfigModel | undefined,
//     setConfig: React.Dispatch<React.SetStateAction<IAppContext['config']>>
// }


// export const AppContext = createContext<IAppContext | null>(null);


// export const useAppContext = () =>
//     useContextWrapper(AppContext, {
//         contextName: useAppContext.name,
//         providerName: AppContextProvider.name
//     })



// export const AppContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
//     const [notification, setNotification] = useState<IAppContext['notification']>(undefined);
//     const [config, setConfig] = useState<IAppContext['config']>();
//     const value = React.useMemo(() => ({ notification, setNotification, config, setConfig }),  [notification, config]);
//     return <AppContext.Provider value={value}>{children}</AppContext.Provider>
// }


// const App = () => {


//   const { setConfig } = useAppContext();
//   const [intializing, setInitializing] = useState(true);


//   //TODO: Need to check why it is firing twice;
//   useEffect(() => {
//     let ignore = false;
//     if (!ignore) {
//       initialiazeConfig().then((res) => {
//         setConfig(res as IConfigModel);
//         configureAxios(LabServicesApi, res.autowireApiUrl);
//         setInitializing(false);
//       });
//     }
//     return () => { ignore= true }
//   }, []);
