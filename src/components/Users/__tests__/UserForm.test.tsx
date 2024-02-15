import { act, fireEvent, prettyDOM, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppContextProvider } from "../../../AppContext";
import UserForm from "../UserForm";
import userEvent from '@testing-library/user-event'
import UsersClient from "../UsersClient";


describe('Users Form', () => {

    it("rendering and submitting User form", async () => {
        jest.mock('../UsersClient', () => jest.fn());
        UsersClient.addUser = jest.fn().mockImplementation(() => Promise.resolve({data: []}));
        UsersClient.editUser = jest.fn().mockImplementation(() => Promise.resolve({data: []}));

        render(<MemoryRouter><AppContextProvider><UserForm /></AppContextProvider></MemoryRouter>);
        const user = userEvent.setup();
        await act(async () => {
            await user.type(screen.getByRole('textbox', {name: 'Name'}), 'Prabhakar');
            await user.type(screen.getByRole('textbox', {name: /user name/i}), 'testing')
            await user.type(screen.getByRole('textbox', {name: /email/i}), 'test@test.com')
            await user.type(screen.getByRole('textbox', {name: /phone/i}), '11111')
            await user.type(screen.getByRole('textbox', {name: /website/i}), 'abc')
            await user.click( screen.getByRole('button', {name: /submit/i}))
        })


        await waitFor(() => {
            expect(UsersClient.addUser).toBeCalled()
            expect(UsersClient.editUser).not.toBeCalled()
        }
    
      )

    })

})