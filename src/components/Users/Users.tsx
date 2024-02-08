import React, { useContext, useEffect, useState } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Title from '../Title';
import Loader from '../../core/Loader';
import { LabServicesApi } from '../../core/LabApi';
import tableIcons from '../../core/TableIcons';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IUser } from './IUser';
import { useUserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import MaterialTable, { MTableToolbar } from 'material-table'
import { blue, grey } from '@mui/material/colors';

export default function Users() {

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

    const columns = [
        { title: "Name", field: "name" },
        { title: "User Name", field: "username" },
        { title: "Email", field: "email" },
        // { title: "Phone", field: "phone"},
        { title: "Website", field: "website" },
    ];

    return (

        <Loader isLoading={isLoading}>
            <React.Fragment>
                <MaterialTable icons={tableIcons} title="Users" columns={columns} data={companyUsers}
                    style={{ margin: 10 }}
                    components={{
                        Toolbar: props => (
                            <div style={{ backgroundColor: blue[600] }} >
                                <MTableToolbar {...props} />
                            </div>

                        )
                    }}
                    actions={[
                        rowData => ({
                            icon: EditIcon,
                            tooltip: 'Edit User',
                            onClick: (event, rowData: any) => {
                                const url = `/users/edit/${rowData.id}`;
                                nav(url)
                            }
                        }),
                        rowData => ({
                            icon: DeleteIcon,
                            tooltip: 'Delete User',
                            onClick: (event, rowData: any) => alert("You want to delete " + rowData.name),
                        })
                    ]}
                    options={{
                        toolbar: true,
                        actionsColumnIndex: -1,
                        headerStyle: { fontWeight: "bold", backgroundColor: grey[300] },
                        pageSize: 10,
                        pageSizeOptions: [10, 20, 50],
                        rowStyle: (data, index) => {
                            if (index % 2 != 0)
                                return { backgroundColor: grey[200] }
                            return { }
                        }
                        // rowStyle:(data,index)=>index%2==0?{backgroundColor:'#eee'}:null,

                    }}

                />



                {/* <Title>Users</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Website</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user: any) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.website}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table> */}

            </React.Fragment>
        </Loader>

    );
}