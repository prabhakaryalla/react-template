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