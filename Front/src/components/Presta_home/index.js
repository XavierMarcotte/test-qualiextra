import React, { useState, useEffect } from 'react';
import './style.scss';
import BackChevron from '../BackChevron';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Map from '../Map/map';
import axios from 'axios';
import Cardprop from '../Cards/cardprop';

function Homeprestapage() {
  const urlPresta = `http://localhost:3000/prestataire/etablissement`;
  const [presta, setPresta] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchInfoPresta = () => {
    return fetch(urlPresta)
      .then((res) => res.json())
      .then((data) => setPresta(data))
      .catch((error) => console.error('Erreur lors du chargement des utilisateurs:', error));
  };

  useEffect(() => {
    fetchInfoPresta();
  }, []);

  useEffect(() => {
    fetchPresta();
  }, []);

  const fetchPresta = async () => {
    try {
      const response = await axios.get(urlPresta);
      setPresta(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPresta = presta.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const prestaCard = filteredPresta.map((user, index) => (
    <div className='homepagepresta-div-left-article-each' key={index}>
      <Cardprop
        id = {user.id}
        etablissementId={user.id}
        key={index}
        lieu={user.address}
        nom={user.name}
        service={user.service}
        price={user.avg_price}
        phone={user.phone}
        photo={user.image}
      />
    </div>
  ));

  return (
    <section className='homepagepresta'>
      <BackChevron />
      <div className="presta-div-searchbar prestasearch">
        <input
          className="presta-div-searchbar-input"
          type="search"
          placeholder="Chercher un établissement.."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="presta-div-searchbar-submit" aria-label="Rechercher" type="submit">
          <span className="sr-only">Rechercher</span>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div className='homepagepresta-div'>
        <div className='homepagepresta-div-left'>
          <h3 className='homepagepresta-div-left-title'>Mes Etablissements</h3>
          <div className='homepagepresta-div-left-article'>
            {prestaCard}
          </div>
        </div>
        <div className='homepagepresta-div-map'>
          <h3 className='homepagepresta-div-map-title'>Carte interactive</h3>
          <Map />
        </div>
      </div>
      <div className='homepagepresta-list'>
        <h4 className='homepagepresta-list-title' >En tant que prestataire, je souhaite :</h4>
        <ul className='admin-list'>
          <li className='admin-list-item presta-button'>
            <a className='admin-list-item-button' href='/prestataire/etablissement'>Ajouter un établissement</a>
          </li>
          <li className='admin-list-item presta-button'>
            <a className='admin-list-item-button' href='/prestataire/service'>Ajouter un service</a>
          </li>
          <li className='admin-list-item presta-button'>
            <a className='admin-list-item-button' href='/prestataire/commande'>Voir les commandes Clients</a>
          </li>
          <li className='admin-list-item presta-button'>
            <a className='admin-list-item-button' href='/prestataire/servicelist'>Voir les services actuels</a>
          </li>
          <li className='admin-list-item presta-button'>
            <a className='admin-list-item-button' href='/prestataire/informations'>Accèder à mes informations</a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Homeprestapage;
