import React, { useEffect, useState } from 'react';
import './style.scss';
import BackChevron from '../../../components/BackChevron';
import Cardprop from '../../../components/Cards/cardprop';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Servicelist() {


  const { user } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (!user || (user.role !== 'prestataire' && user.role !== 'admin')) {
      console.error('Accès non autorisé');
      navigate('/auth?error=Acces%20Non%20Autorisé');
    }
  }, [user]);



  const urlService = 'http://localhost:3000/prestataire/service';
  const [service, setService] = useState([]);
  const [filteredService, setFilteredService] = useState([]); 
  const [searchValue, setSearchValue] = useState('');



  const fetchInfoService = () => {
    return fetch(urlService)
      .then((res) => res.json())
      .then((data) => setService(data))
      .catch((error) => console.error('Erreur lors du chargement des utilisateurs:', error));
  };

  const fetchService = async () => {
    try {
      const response = await axios.get(urlService);
      setService(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
    }
  };

  useEffect(() => {
    fetchInfoService();
  }, []);


  useEffect(() => {
    fetchService();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchValue(searchTerm);
    const filteredServices = service.filter((s) => s.name.toLowerCase().includes(searchTerm));
    setFilteredService(filteredServices);
  };



  const serviceToDisplay = searchValue ? filteredService : service;

  const serviceCard = serviceToDisplay.map((user, index) => {
  return (
    <Cardprop
      id={user.id}
      etablissementId={user.etablissementId}
      key={index}
      nom={user.name}
      price={user.price}
      description={user.description}
      guest={user.guest}
      extra={user.extra}
      photo={user.image}
      etablissement={user.etablissements}
      limit={user.limit}
      durationNumber={user.durationNumber}
      durationUnit={user.durationUnit}
    />
    )
  });

  return (
    <>
      <Header />
      <section className="servicelist">
      <BackChevron />
        <div className="presta-div-searchbar prestasearch">
          <input
            className="presta-div-searchbar-input" type="search" placeholder="Chercher un service..." value={searchValue} onChange={handleSearch}
          />
          <button className="presta-div-searchbar-submit" aria-label="Rechercher" type="submit">
            <span className="sr-only">Rechercher</span>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <h3 className="servicelist-title">Mes Services</h3>
        <div className="servicelist-article">
          {serviceCard}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Servicelist;