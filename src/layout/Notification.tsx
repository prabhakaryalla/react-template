import { IconButton, Snackbar, SnackbarContent } from "@mui/material";
import { Close, Warning, Info } from "@mui/icons-material";
import { amber, blue } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../AppContext";


export enum NotificationType {
    Error,
    Info
}


export interface INotificationMessage {
    message: string,
    type: NotificationType
}


const renderNotificationIcon = (type: NotificationType) => {
    if (type === NotificationType.Error)
        return <Warning style={{ opacity: 0.9, verticalAlign: 'bottom', marginRight: '2px' }} />


    return <Info style={{ opacity: 0.9, verticalAlign: 'bottom', marginRight: '5px' }} />
}


const Notifications: React.FC = () => {
    const { notification, setNotification } = useAppContext();
    const [open, setOpen] = useState<boolean>(notification === undefined);


    useEffect(() => {
        const isOpen = notification !== undefined ? true : false;
        setOpen(isOpen)
    }, [notification])


    const onCloseClick = () => {
        setNotification(undefined);
        setOpen(false);
    }


    if (notification === undefined)
        return <></>


    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={open}
            autoHideDuration={6000}
            onClose={onCloseClick}
            aria-describedby="client-snackbar">
            <SnackbarContent style={{ backgroundColor: notification.type === NotificationType.Error ? amber[700] : blue[700] }}
                message={<span id="client-snackbar">
                    {renderNotificationIcon(notification.type)}
                    {notification.message}
                </span>}
                action={
                    <IconButton key="close" aria-label="Close" color="inherit" onClick={onCloseClick}>
                        <Close />
                    </IconButton>
                }
            />
        </Snackbar>
    );
}


export default Notifications;


