import React from 'react';
import './SearchBox.css'


const SearchBox = ({requestSearch}) => {
  const [query, setQuery] = React.useState("");

  const searchClick = () => {
    if (query) {
      requestSearch(query)
      setQuery("")
    }
  };

  // @todo add a form?

  const onFormSubmit = (event) => {
    event.preventDefault();
    searchClick()
  }

  return (
    <div className="search-container">
      <form onSubmit={onFormSubmit} >

        <input 
          className="search-input"
          type="text"
          name="search"
          placeholder="Search"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className="search-button" onClick={searchClick} data-testid="search-button">
          <div className="search-button-icon">
            <i className={"small search icon"} />
          </div>
        </button>
      </form>
    </div>
  )
};
//<i class="coffee icon"></i>

export default SearchBox;