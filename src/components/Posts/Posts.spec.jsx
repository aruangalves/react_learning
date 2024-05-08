import { render, screen } from '@testing-library/react';
import { Posts } from '.';

const props = {
    posts: [
        {
            id: 1,
            title: 'Post #1',
            body: 'Some text for post #1',
            cover: 'img/img1.jpg',
        },
        {
            id: 2,
            title: 'Post #2',
            body: 'Some text for post #2',
            cover: 'img/img2.jpg',
        },
        {
            id: 3,
            title: 'Post #3',
            body: 'Some text for post #3',
            cover: 'img/img3.jpg',
        },
    ],
};

describe('<Posts />', () => {
    it('should render all posts', () => {
        render(<Posts {...props} />);

        expect(screen.getAllByRole('heading', { name: /Post #/i })).toHaveLength(3);
        expect(screen.getAllByRole('img', { name: /Post #/i })).toHaveLength(3);
        expect(screen.getAllByText(/Some text for post #/i)).toHaveLength(3);
        expect(screen.getByRole('img', { name: /Post #3/i })).toHaveAttribute('src', 'img/img3.jpg');
    });

    it('should render an empty post list', () => {
        render(<Posts />);
        expect(screen.queryByRole('heading', { name: /Post #/i })).not.toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(<Posts {...props} />);
        const { firstChild } = container;

        expect(firstChild).toMatchSnapshot();
    });
});
