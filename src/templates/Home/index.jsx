import logo from './logo.svg';
import './styles.css';

import { useEffect, useState, useCallback } from 'react';
import { Posts } from '../../components/Posts';
import { loadPosts } from '../../actions/load-posts';
import { Button } from '../../components/Button';
import { SearchInput } from '../../components/SearchInput';

export const Home = () => {
    const [name] = useState('Test case #');
    const [counter, setCounter] = useState(1);
    const [updates] = useState(0);
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [postsPerPage] = useState(12);
    const [disableButton, setDisableButton] = useState(true);
    const [searchValue, setSearchValue] = useState('');

    const filteredPosts = searchValue
        ? posts.filter((post) => {
              return post.title.toLowerCase().includes(searchValue.toLowerCase());
          })
        : posts;

    const handlePClick = () => {
        setCounter(counter + 1);
    };

    const handleLoadPosts = useCallback(async (page, postsPerPage) => {
        let postsAndPhotos = await loadPosts();
        let denyMorePosts = true;

        if (page + postsPerPage < postsAndPhotos.length) {
            denyMorePosts = false;
        }

        setPosts(postsAndPhotos.slice(page, postsPerPage));
        setAllPosts(postsAndPhotos);
        setDisableButton(denyMorePosts);
    }, []);

    useEffect(() => {
        handleLoadPosts(0, postsPerPage);
    }, [handleLoadPosts, postsPerPage]);

    const loadMorePosts = () => {
        let nextPage = page + postsPerPage;
        let nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
        posts.push(...nextPosts);
        let denyMorePosts = false;
        if (nextPage + postsPerPage > allPosts.length) {
            denyMorePosts = true;
        }
        setPosts(posts);
        setPage(nextPage);
        setDisableButton(denyMorePosts);
    };

    const handleSearchChange = (e) => {
        let { value } = e.target;

        setSearchValue(value);
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p onClick={handlePClick}>
                    Edit <code>src/App.js</code> and save to reload. {name}
                    {counter}
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
                <p>
                    Amount of updated states: <b>{updates}</b>
                </p>
                <section className="container">
                    <div className="search-container">
                        {!!searchValue && <h1>Search value: {searchValue}</h1>}
                        <SearchInput searchHandler={handleSearchChange} searchValue={searchValue} />
                    </div>
                    {filteredPosts.length > 0 ? (
                        <Posts posts={filteredPosts} />
                    ) : (
                        <p>Não existem posts que correspondam aos termos da busca.</p>
                    )}

                    {!searchValue && <Button disabled={disableButton} onClick={loadMorePosts} text="Load more posts" />}
                </section>
            </header>
        </div>
    );
};

export default Home;
