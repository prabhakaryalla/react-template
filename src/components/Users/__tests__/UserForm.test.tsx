import { act, fireEvent, prettyDOM, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppContextProvider } from "../../../AppContext";
import UserForm from "../UserForm";
import userEvent from '@testing-library/user-event'


describe('Users Form', () => {

    // it("Should display errors when mandatory fields are not entered", async () => {
    //     await act(async () => render(<MemoryRouter><AppContextProvider><UserForm /></AppContextProvider></MemoryRouter>));
    //     // console.log(prettyDOM(screen.getAllByRole('row')[1]))
    //     const submitButton = screen.getByRole('button', {name: /submit/i});
    //     fireEvent.click(submitButton);
        
    //     await waitFor(() => {
    //         console.log(prettyDOM(screen.getAllByRole('paragraph')[0]))
    //         // expect(screen.getByLabelText('User Name is Required')).toBeTruthy())
    //     });
    // })

    it("rendering and submitting User form", async () => {
        const handleSubmit = jest.fn();

        const { container } = render(<MemoryRouter><AppContextProvider><UserForm onSubmit={handleSubmit} /></AppContextProvider></MemoryRouter>);
        const user = userEvent.setup();
        await act(async () => {
            await user.type(container.querySelector('input[name="name"]')!, 'Prabhakar');
            await user.type(container.querySelector('input[name="username"]')!, 'testing')
            await user.type(container.querySelector('input[name="email"]')!, 'test@test.com')
            await user.type(container.querySelector('input[name="phone"]')!, '11111')
            await user.type(container.querySelector('input[name="website"]')!, 'abc')
        })

        const submitButton = screen.getByRole('button', {name: /submit/i});
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(handleSubmit).toBeCalledTimes(1)
        }
       
        // expect(handleSubmit).toHaveBeenCalledWith({
        //   name: 'Prabhakar',
        //   username: 'testing',
        //   email: 'test@test.com',
        //   phone: '11111',
        //   website: 'abc'
        // }),
      )

    })

})