import './styles.css';

import P from 'prop-types';

export const SearchInput = ({ searchHandler, searchValue }) => {
    return (
        <input
            className="searchInput"
            onChange={searchHandler}
            value={searchValue}
            type="search"
            placeholder="Busca por título"
        />
    );
};

SearchInput.defaultProps = {
    searchValue: '',
};

SearchInput.propTypes = {
    searchHandler: P.func.isRequired,
    searchValue: P.string,
};
