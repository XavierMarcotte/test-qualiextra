import './style.scss';
import { React, useState } from 'react';
import categories from "./datas.js";
import Counter from '../counter';
import slugify from 'slugify';

function Reservation() {
    const [isNotifVisible, setIsNotifVisible] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [participantCount, setParticipantCount] = useState(1);
    const [keyword, setkeyword] = useState('');

    function handleCounterChange(newValue) {
        setParticipantCount(newValue);
    }

    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setSelectedCategories((prevSelectedCategories) => {
            if (prevSelectedCategories.includes(value)) {
                return prevSelectedCategories.filter(category => category !== value);
            } else {
                return [...prevSelectedCategories, value];
            }
        });
    };

    const handleSearchClick = () => {
        const formattedArrivalDate = arrivalDate ? arrivalDate.slice(0, 10) : '';
        const formattedDepartureDate = departureDate ? departureDate.slice(0, 10) : '';
        let url = '/search';
    
        if (arrivalDate || departureDate || keyword || participantCount) {
            url += '?';
        
            if (arrivalDate) {
                url += `arrivalDate=${arrivalDate}`;
            }
        
            if (departureDate) {
                url += `${arrivalDate || keyword || participantCount ? '&' : ''}departureDate=${departureDate}`;
            }
        
            if (keyword) {
                url += `${(arrivalDate || departureDate || participantCount) ? '&' : ''}keyword=${keyword}`;
            }
        
            if (participantCount) {
                url += `${(arrivalDate || departureDate || keyword) ? '&' : ''}participantCount=${participantCount}`;
            }
            
            if (selectedCategories.length > 0) {
                const selectedCategorie = selectedCategories.toString()
                const slug = slugify(selectedCategorie, { lower: true })
                url += `${(arrivalDate || departureDate || keyword || participantCount) ? '&' : ''}tags=${slug}`;
            }
        }
        window.location.href = url;
    };

    const categoryCheckboxes = categories.map(categorie => (
        <label className={`category-checkboxes-label ${selectedCategories.includes(categorie.title) ? 'selected' : ''}`} key={categorie.id}>
            <input type="checkbox" value={categorie.title} checked={selectedCategories.includes(categorie.title)} onChange={handleCategoryChange} />
            <span>
             {categorie.title}
            </span>
        </label>
    ));

    return (
        <section className='reservation'>
            <h3 className='reservation--title condition'><span><span className='color'>Réservez </span> votre </span> moment idéal</h3>
            <div className='reservation--column1'>
                <div className='panier--container--desc--reservation--date up'>
                    <label className='color panier--container--desc--info--text' htmlFor="start">Arrivée</label>
                    <input className='panier--container--desc--info--date' type="date" min="2018-01-01" max="2099-12-31" value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)}/>
                </div>
                <div className="searchBox">
                    <input className="searchInput" type="text" name="" placeholder="Rechercher par mots clés" value={keyword} onChange={(e) => setkeyword(e.target.value)} />
                    <button className="searchButton">
                        <i className="material-icons">
                            &#128269;
                        </i>
                    </button>
                </div>
            </div>
            <div className='reservation--column2'>
                <div className='panier--container--desc--reservation--date up'>
                    <label className='color panier--container--desc--info--text' htmlFor="start">Départ</label>
                    <input className='panier--container--desc--info--date' type="date" min="2018-01-01" max="2099-12-31" value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}/>
                </div>
                <div className="filter--container">
                    <label className={`filter--container--label color ${showOverlay ? 'active' : ''}`} onClick={() => setShowOverlay(!showOverlay)}>
                        Filtres
                        <span className="arrow">&#9662;</span>
                    </label>
                    {showOverlay && (
                        <div className="overlay">
                            <h3 className='overlay-title'>Catégories :</h3>
                            <div className="category-checkboxes">
                                {categoryCheckboxes}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='reservation--column3'>
                <div className='up'>
                    <Counter value={participantCount} handleCounterChange={handleCounterChange} />
                </div>
                <button className='reservation--column3--button' onClick={handleSearchClick}>Rechercher</button>
            </div>
        </section>
    );
}

export default Reservation;

