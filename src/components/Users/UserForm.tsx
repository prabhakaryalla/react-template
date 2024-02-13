import { useFormik } from "formik";
import { IUser, UserValidationSchema } from "./IUser";
import { Button, TextField } from "@mui/material";
import { LabServicesApi } from "../../core/LabApi";
import FullPage from "../../core/FullPage";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContext";
import { INotificationMessage, NotificationType } from "../../layout/Notification";

interface IProps {
    user?: IUser
}



const UserForm = (props: IProps) => {

    const nav = useNavigate();
    const user: IUser = props.user || {
        id: 0,
        name: '',
        email:'',
        phone: '',
        website:'',
        username: ''
    };

    const {addNotification} = useAppContext();
    
    const isEdit = Boolean(user.id == 0);
    const formik = useFormik({
        initialValues: user,
        validationSchema: UserValidationSchema,
        // validationSchema: UserValidationSchema,
        onSubmit: values => {
            //const url = isEdit ? `/users/${user?.id}` : "/users";
            const url = "/users";
            if(isEdit)
            {
                LabServicesApi.put(`/users/${user?.id}`, JSON.stringify(values))
                .then((response: any) => {
                    console.log('response', response);
                addNotification({message: 'created', type: NotificationType.Info } as INotificationMessage)
                nav(url);

                });
            }
            else {
                LabServicesApi.post(`/users`, JSON.stringify(values))
                .then((response: any) => {
                    console.log('response', response);
                    nav(url);
                });                
            }
        },
    });

    return (<div>
        <FullPage heading="User Form">
        <form onSubmit={formik.handleSubmit}>
            <TextField
                fullWidth
                sx={{ my: 1 }}
                size="small"
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
                fullWidth
                sx={{ my: 1 }}
                id="username"
                size="small"
                name="username"
                label="User Name"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
                fullWidth
                sx={{ my: 1 }}
                id="email"
                size="small"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
                fullWidth
                sx={{ my: 1 }}
                id="phone"
                name="phone"
                size="small"
                label="Phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
            />

            <TextField
                fullWidth
                sx={{ my: 1 }}
                size="small"
                id="website"
                name="website"
                label="Website"
                type="website"
                value={formik.values.website}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.website && Boolean(formik.errors.website)}
                helperText={formik.touched.website && formik.errors.website}
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
                Submit
            </Button>
        </form>

        </FullPage>
    
    </div>)
}

export default UserForm;