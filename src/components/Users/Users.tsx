import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IUser } from './IUser';
import { useUserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import { Column } from 'material-table'
import { useTheme } from '@mui/material/styles';
import Table from '../../core/Table';
import { fetchUsers } from './UsersClient';

export default function Users() {
    const theme = useTheme();

    const [companyUsers, setCompanyUsers] = useState([] as IUser[]);
    const [isLoading, setIsLoading] = useState(true);
    const { users, setUsers } = useUserContext();
    const nav = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        fetchUsers().then(res => {
            setCompanyUsers(res);
            setUsers(res as IUser[]);
            setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false);
        })
    }, [])

    type RowData = IUser;

    const columns: Column<RowData>[] = [
        { title: "Name", field: "name" },
        { title: "User Name", field: "username" },
        { title: "Email", field: "email" },
        // { title: "Phone", field: "phone"},
        { title: "Website", field: "website" },
    ];

    const handleEdit = (rowData: any) => {
        const url = `/users/edit/${rowData.id}`;
        nav(url)
    }

    return (

        <Table title="Users" isLoading={isLoading} columns={columns} data={companyUsers}
            actions={[
                {
                    icon: EditIcon,
                    tooltip: 'Edit User',
                    onClick: (event, rowData: any) => {
                        const url = `/users/edit/${rowData.id}`;
                        nav(url)
                    }
                },
                {
                    icon: DeleteIcon,
                    tooltip: 'Delete User',
                    onClick: (event, rowData: any) => alert("You want to delete " + rowData.name),
                }

            ]} />);
}
