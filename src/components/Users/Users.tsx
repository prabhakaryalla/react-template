import { useEffect, useState } from 'react';
import { LabServicesApi } from '../../core/LabApi';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IUser } from './IUser';
import { useUserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import { Column, MTableToolbar } from 'material-table'
import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import Table from '../../core/Table';

export default function Users() {
    const theme = useTheme();

    const [companyUsers, setCompanyUsers] = useState([] as IUser[]);
    const [isLoading, setIsLoading] = useState(true);
    const { users, setUsers } = useUserContext();
    const nav = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        LabServicesApi.get('/users').then((response: any) => {
            setCompanyUsers(response.data as IUser[]);
            setUsers(response.data as IUser[]);
            setIsLoading(false);
        });

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
            components={{
                Toolbar: props => (
                    <div style={{ backgroundColor: theme.palette.primary.main }} >
                        <MTableToolbar {...props} searchFieldStyle={{ backgroundColor: grey[200] }} />
                    </div>
                )

            }}
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
