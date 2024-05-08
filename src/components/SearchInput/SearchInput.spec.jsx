import { render, screen } from '@testing-library/react';
import { SearchInput } from '.';
import userEvent from '@testing-library/user-event';

const placeholder = 'Busca por título';

describe('<SearchInput />', () => {
    it('should have a search value', () => {
        const fn = jest.fn();
        render(<SearchInput searchHandler={fn} searchValue={'testing'} />);

        const input = screen.getByPlaceholderText(placeholder);

        expect(input).toBeInTheDocument();
        expect(input.value).toBe('testing');
    });

    it('should call handleChange function on each key press', () => {
        const fn = jest.fn();
        render(<SearchInput searchHandler={fn} searchValue={'some search value'} />);

        const input = screen.getByPlaceholderText(placeholder);

        const testValue = 'some search value';

        userEvent.type(input, testValue);
        expect(input.value).toBe(testValue);
        expect(fn).toHaveBeenCalledTimes(testValue.length);
    });

    it('should match snapshot', () => {
        const fn = jest.fn();
        const { container } = render(<SearchInput searchHandler={fn} searchValue={''} />);
        const { firstChild } = container;

        expect(firstChild).toMatchSnapshot();
    });
});
