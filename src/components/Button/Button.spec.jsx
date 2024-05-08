import { render, screen } from "@testing-library/react";
import { Button } from '.';
import userEvent from "@testing-library/user-event";

describe('<Button />', ()=>{
    it('should render button with text', ()=>{
        render(<Button text="Load more posts" />);

        expect.assertions(1);

        const button = screen.getByRole('button', { name: /load more posts/i});
        expect(button).toBeInTheDocument();
    });

    it('should call function on click', ()=>{
        const fn = jest.fn();
        render(<Button text="Load more posts" onClick={fn} />);

        expect.assertions(1);

        const button = screen.getByRole('button', { name: /load more posts/i});

        userEvent.click(button);
        //fireEvent.click(button);

        expect(fn).toHaveBeenCalledTimes(1);
        
    });

    it('should be disabled when disabled prop is true', ()=>{
        render(<Button text="Load more posts" disabled={true} />);

        expect.assertions(1);

        const button = screen.getByRole('button', { name: /load more posts/i});

        expect(button).toBeDisabled();
        
    });

    it('should be enabled when disabled prop is false', ()=>{
        render(<Button text="Load more posts" disabled={false} />);

        expect.assertions(1);

        const button = screen.getByRole('button', { name: /load more posts/i});

        expect(button).toBeEnabled();
        
    });
});

