import SearchBar from 'material-ui-search-bar';
import React from 'react';
SearchNav.propTypes = {
    
};

function SearchNav(props) {
    return (
        <div class="header__navbar_left-search">
        
        <SearchBar
          className="search_input"
          placeholder="Nhập tìm kiếm của bạn"
          autoFocus
          className="search-icon"
        />
      </div>
    );
}

export default SearchNav;