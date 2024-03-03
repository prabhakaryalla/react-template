import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search'
import { IUser } from './IUser';
import { useUserContext } from './UserContext';
import { NavLink, useNavigate } from 'react-router-dom';
// @ts-ignore
import { Column } from 'material-table'
import { useTheme } from '@mui/material/styles';
import Table from '../../core/Table';
import FullPage from '../../core/FullPage';
import { Box, Button, Card, CardActions, CardContent, Container, Divider, Fab, Grid, IconButton, InputAdornment, InputBase, Paper, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import UsersClient from './UsersClient';
import Loader from '../../core/Loader';
import UserForm from './UserForm';


export const AddLink = function AddLink() {
    return (
        <Fab to={'/users/create'} component={NavLink} variant="extended" color="primary" aria-label="add user" size="medium">
            <AddIcon /> Add User
        </Fab>
    )
}


const UserSearchForm = () => {

    const nav = useNavigate();
    const [userID, setUserId] = useState("");
    const [user, SetUser] = useState<IUser>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (userID != "") {
            setIsLoading(true);
            const getData = setTimeout(() => {
                UsersClient.getUser(userID).then(response => {
                    SetUser(response);
                    console.log(response);
                }).finally(() => {
                    setIsLoading(false);
                })

            }, 2000);

            return () => clearTimeout(getData);
        }

    }, [userID])

    return (<FullPage heading="Users" actions={<AddLink />}>
        {/* <Container maxWidth="md">
                <TextField
                    id="search"
                    type="search"
                    label="User Id"
                    size='small'
                    value={userID}
                    onChange={(event) => setUserId(event.target.value)}
                    sx={{ width: 400 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Container> */}
        <Paper
            component="form"
            sx={{ p: '2px 4px', mb: 2, display: 'flex', alignItems: 'center', width: 400 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                size='small'
                placeholder="Enter User Id"
                inputProps={{ 'aria-label': 'search users' }}
                value={userID}
                onChange={(event) => setUserId(event.target.value)}
            />
            <IconButton sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>

        <Divider />
        {/* <TextField onChange={(event) => setUserId(event.target.value)} ></TextField> */}
        <br />
        <Loader isLoading={isLoading}>
            {user ?
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h6" component="div">User Details</Typography>
                        <Divider /> <br />
                        <Typography variant="body2">Name: {user.name}</Typography>
                        <Typography variant="body2">Email: {user.email}</Typography>
                        
                    </CardContent>

                    <CardActions>
                        <Button variant="contained" color="primary"  onClick={() => nav(`/users/edit/${user.id}`)} size="small">Update</Button>
                    </CardActions>
                </Card>
                : <>No data Found</>}
        </Loader>



    </FullPage>)
}

export default UserSearchForm;