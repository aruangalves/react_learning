import userEvent from '@testing-library/user-event';
import { Home } from '.';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';

const { render, waitForElementToBeRemoved, screen } = require('@testing-library/react');

const handlers = [
    http.get('https://jsonplaceholder.typicode.com/posts', async () => {
        return HttpResponse.json([
            {
                userId: 1,
                id: 1,
                title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
                body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
                url: 'https://via.placeholder.com/600/92c952',
            },
            {
                userId: 1,
                id: 2,
                title: 'qui est esse',
                body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
                url: 'https://via.placeholder.com/600/771796',
            },
            {
                userId: 1,
                id: 3,
                title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
                body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
                url: 'https://via.placeholder.com/600/24f355',
            },
            {
                userId: 1,
                id: 4,
                title: 'eum et est occaecati',
                body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
                url: 'https://via.placeholder.com/600/d32776',
            },
            {
                userId: 1,
                id: 5,
                title: 'nesciunt quas odio',
                body: 'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
                url: 'https://via.placeholder.com/600/f66b97',
            },
            {
                userId: 1,
                id: 6,
                title: 'dolorem eum magni eos aperiam quia',
                body: 'ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae',
                url: 'https://via.placeholder.com/600/56a8c2',
            },
            {
                userId: 1,
                id: 7,
                title: 'magnam facilis autem',
                body: 'dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas',
                url: 'https://via.placeholder.com/600/b0f7cc',
            },
            {
                userId: 1,
                id: 8,
                title: 'dolorem dolore est ipsam',
                body: 'dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae',

                url: 'https://via.placeholder.com/600/54176f',
            },
            {
                userId: 1,
                id: 9,
                title: 'nesciunt iure omnis dolorem tempora et accusantium',
                body: 'consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas',
                url: 'https://via.placeholder.com/600/51aa97',
            },
            {
                userId: 1,
                id: 10,
                title: 'optio molestias id quia eum',
                body: 'quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error',
                url: 'https://via.placeholder.com/600/810b14',
            },
            {
                userId: 2,
                id: 11,
                title: 'et ea vero quia laudantium autem',
                body: 'delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi',
                url: 'https://via.placeholder.com/600/1ee8a4',
            },
        ]);
    }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
    beforeAll(() => {
        server.listen();
    });

    afterEach(() => {
        server.resetHandlers();
    });

    afterAll(() => {
        server.close();
    });

    it('should render search, posts and load more button', async () => {
        render(<Home />);
        const noMorePosts = screen.getByText('Não existem posts que correspondam aos termos da busca.');

        expect.assertions(3);

        await waitForElementToBeRemoved(noMorePosts);
        //screen.debug();

        const search = screen.getAllByPlaceholderText('Busca por título');

        expect(search).toBeInTheDocument();

        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(10);

        const button = screen.getByRole('button', { name: /Load more posts/i });
        expect(button).toBeInTheDocument();
    });

    it('should search for posts', async () => {
        render(<Home />);
        const noMorePosts = screen.getByText('Não existem posts que correspondam aos termos da busca.');

        expect.assertions(5);

        await waitForElementToBeRemoved(noMorePosts);

        const search = screen.getAllByPlaceholderText('Busca por título');
        expect(
            screen.getByRole('heading', {
                name: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            }),
        ).toBeInTheDocument();

        userEvent.type(search, 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
        expect(
            screen.getByRole('heading', {
                name: 'qui est esse',
            }),
        ).not.toBeInTheDocument();
        expect(
            screen.getByRole('heading', {
                name: 'Search value: sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            }),
        ).toBeInTheDocument();

        userEvent.clear(search);
        expect(
            screen.getByRole('heading', {
                name: 'qui est esse',
            }),
        ).toBeInTheDocument();

        userEvent.type(search, 'typed a non-existent post title in the search bar');
        expect(screen.getByText('Não existem posts que correspondam aos termos da busca.')).toBeInTheDocument();
    });

    it('should load more posts on button click', async () => {
        render(<Home />);
        const noMorePosts = screen.getByText('Não existem posts que correspondam aos termos da busca.');

        //expect.assertions(3);

        await waitForElementToBeRemoved(noMorePosts);
        //screen.debug();

        const button = screen.getByRole('button', { name: /Load more posts/i });
        userEvent.click(button);
        expect(screen.getByRole('heading', { name: 'et ea vero quia laudantium autem' })).toBeInTheDocument();
        expect(button).toBeDisabled();
    });
});
