import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { getTheme } from "../../../layout/Theme";
import { UserContextProvider } from "../UserContext";
import Users from "../Users";
import { fetchUsers } from "../UsersClient";

// jest.mock('../UsersClient', () => ({
//     fetchUsers: jest.fn(() => Promise.resolve([]))
// }));

describe('Users List', () => {

    it('Should Contain Add User Button', async () => {
        jest.mock('../UsersClient', () => ({
            fetchUsers: jest.fn(() => Promise.resolve([]))
        }));

         render(<MemoryRouter><ThemeProvider theme={getTheme()}><UserContextProvider><Users /></UserContextProvider></ThemeProvider></MemoryRouter>);
         expect(screen.getByText('Add User').closest('a')).toHaveAttribute('href', '/users/create');
    })
})