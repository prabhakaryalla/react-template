import * as Yup from 'yup';

export interface IUser {
    id: number,
    name: string,
    username:string,
    email:string,
    phone:string,
    website:string
}


export const UserValidationSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('User Name is Required'),
    phone: Yup.string()
        .required('Phone is Required'),
    email: Yup.string().email('Invalid email').required('Email is Required'),
});