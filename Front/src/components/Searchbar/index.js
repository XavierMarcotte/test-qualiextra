import React, { useState } from 'react';
import BackChevron from "../BackChevron";
import loupe from '../../components/Reservation/logos/loupe.png';
import './style.scss';

function SearchBar({ onSearch }) {
    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        onSearch(value);
    };

    return (
        <section className="searchbar">
            <div className="searchbar-back">
                <BackChevron />
            </div>
            <div className='searchbar-search'>
                <input type="search" placeholder='Rechercher par mots clés' value={searchValue} onChange={handleInputChange} />
                <img src={loupe} alt="Loupe" />
            </div>
        </section>
    );
}

export default SearchBar;