import { act, fireEvent, prettyDOM, render, screen, waitFor, within } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { getTheme } from "../../../layout/Theme";
import { UserContextProvider } from "../UserContext";
import Users from "../Users";
import { UsersMock } from "../__mocks__/Users.mock";
import UsersClient from "../UsersClient";


describe('Users List', () => {

    beforeEach(() => {
        jest.mock('../UsersClient', () => jest.fn());
        UsersClient.fetchUsers = jest.fn().mockImplementation(async () => Promise.resolve(UsersMock));
    })


    it('Should Contain Add User Link', async () => {
        await act(async () =>  render(<MemoryRouter><ThemeProvider theme={getTheme()}><UserContextProvider><Users /></UserContextProvider></ThemeProvider></MemoryRouter>));
        expect(screen.getByText('Add User').closest('a')).toHaveAttribute('href', '/users/create');
    })

    it('Should show the list of users', async () => {
       await act(async () => render(<MemoryRouter><ThemeProvider theme={getTheme()}><UserContextProvider><Users /></UserContextProvider></ThemeProvider></MemoryRouter>));
         // should have CompanyListMock + 2(header and footer) rows in the table
         // also check the setting emptyRowsWhenPaging: false is set in Material Table to remove extrarows
        expect(screen.getAllByRole('row').length).toBe(UsersMock.length + 2)
    })

        it('should redirect to Edit page on Edit Button Click', async () => {
            await act(async () => render(<BrowserRouter><ThemeProvider theme={getTheme()}><UserContextProvider><Users /></UserContextProvider></ThemeProvider></BrowserRouter>));
            // console.log(prettyDOM(screen.getAllByRole('row')[1]))
            const editButton = (within(screen.getAllByRole('row')[1])).getByRole('button', { name: 'Edit User' });
        fireEvent.click(editButton);
        await waitFor(() => expect(window.location.href).toContain('users/edit/1'));
    })
})

