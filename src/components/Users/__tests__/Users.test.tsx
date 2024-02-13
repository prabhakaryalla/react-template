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


// iimport CompanyList from '../CompanyList';
// import { BrowserRouter, MemoryRouter } from 'react-router-dom';
// import { CompanyListMock } from '../__mocks__/CompanyList.mock';
// import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
// import { CompanyContextProvider } from '../CompanyContext';
// import { ThemeProvider } from '@mui/material';
// import { getTheme } from '../../../layout/Theme';
// import CompanyClient from '../CompanyClient';
// import { act } from 'react-dom/test-utils';


// describe("Company List", () => {
//     it('Should Contain Add Company Link', async () => {
//         jest.mock('../CompanyClient', () => jest.fn());
//         CompanyClient.fetchCompanies = jest.fn().mockImplementation(async () => Promise.resolve(CompanyListMock));
//         await render(<MemoryRouter><ThemeProvider theme={getTheme()}><CompanyContextProvider><CompanyList /></CompanyContextProvider></ThemeProvider> </MemoryRouter>);
//         expect(screen.getByText('Add Company').closest('a')).toHaveAttribute('href', '/companies/create');
//     })


//     it('Should show the list of companies', async () => {
//         jest.mock('../CompanyClient', () => jest.fn());
//         CompanyClient.fetchCompanies = jest.fn().mockImplementation(async () => Promise.resolve(CompanyListMock));
//         await act(async () => render(<MemoryRouter><ThemeProvider theme={getTheme()}><CompanyContextProvider><CompanyList /></CompanyContextProvider></ThemeProvider> </MemoryRouter>));
//         // should have CompanyListMock + 2(header and footer) rows in the table
//         expect( screen.getAllByRole('row').length).toBe(CompanyListMock.length + 2)
//     })


//     it('should contain Edit Button', async () => {
//         jest.mock('../CompanyClient', () => jest.fn());
//         CompanyClient.fetchCompanies = jest.fn().mockImplementation(async () => Promise.resolve(CompanyListMock));
//         await act(async () => render(<MemoryRouter><ThemeProvider theme={getTheme()}><CompanyContextProvider><CompanyList /></CompanyContextProvider></ThemeProvider> </MemoryRouter>));
//         const row = screen.getAllByRole('row')[1];
//         expect(within(row).getByRole('button', { name: 'Edit' })).toBeTruthy()
//     })


//     it('should redirect to Edit page on Edit Button Click', async () => {
//         jest.mock('../CompanyClient', () => jest.fn());
//         CompanyClient.fetchCompanies = jest.fn().mockImplementation(async () => Promise.resolve(CompanyListMock));
//         await act(async () => render(<BrowserRouter><ThemeProvider theme={getTheme()}><CompanyContextProvider><CompanyList /></CompanyContextProvider></ThemeProvider> </BrowserRouter>));
//         const editButton = (within(screen.getAllByRole('row')[1])).getByRole('button', { name: 'Edit' });
//         fireEvent.click(editButton);
//         await waitFor(() => expect(window.location.href).toContain('companies/edit/1'));
//     })
// })
