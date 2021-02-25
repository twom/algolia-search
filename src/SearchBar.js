import './SearchBar.css';

const SearchBar = ({ query, setQuery, days, setDays }) => {
  return (
    <div className="search-container">
      <div className="query-container">
        <input
          id="query"
          name="query"
          type="search"
          aria-label="search bar"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
