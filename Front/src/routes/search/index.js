import React, { useState } from 'react';
import SearchBar from '../../components/Searchbar';
import SearchResults from '../../components/SearchResults';
import Categories from '../../components/Categories';
import Insert from '../../components/Insert';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Search() {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (value) => {
        setSearchValue(value);
    };

    return (
        <>
            <Header />
            <SearchBar onSearch={handleSearch} />
            <Categories />
            <SearchResults searchValue={searchValue} />
            <Insert />
            <Footer />
        </>
    );
}

export default Search;