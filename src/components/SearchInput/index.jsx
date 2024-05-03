import './styles.css';

export const SearchInput = ({searchHandler, searchValue}) =>{
    return (
        <input className='searchInput'
            onChange={searchHandler}
            value={searchValue}
            type="search"
            placeholder='Busca por título'           
        />
    );
}