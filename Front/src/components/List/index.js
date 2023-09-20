import Header from '../Header'
import Footer from '../Footer'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowDown, faMagnifyingGlass, faTrash, faBan} from '@fortawesome/free-solid-svg-icons';
import BackChevron from '../BackChevron';
import './style.scss';
import { useAuth } from '../../AuthContext';

function list({ importboard, title, headfirst, headsecond, headthird, headfourth, listfirst, listsecond, blockwhat, deletewhat}){
  const [board, setBoard] = useState(importboard);
  const [expandedItems, setExpandedItems] = useState([]);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [reservations, setReservations] = useState([]);
  const [reservationsPresta, setReservationsPresta] = useState([]);
  const urlUsers = "http://localhost:3000/users";
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  const toggleItem = (index) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter((itemIndex) => itemIndex !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  const fetchInfoUsers = () => {
    return fetch(urlUsers)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Erreur lors du chargement des utilisateurs:', error));
  };

  useEffect(() => {
    fetchInfoUsers();
  }, []);


  const fetchInfoReservation = () => {
    return fetch(`http://localhost:3000/reservation/${user.id}`)
      .then((res) => res.json())
      .then((data) => setReservations(data))
      .catch((error) => console.error('Erreur lors du chargement des reservations'))
  }

  useEffect(() => {
    fetchInfoReservation();
  }, []);

  const fetchInfoReservationPresta = () => {
    return fetch(`http://localhost:3000/reservation/prestataire/${user.id}`)
      .then((res) => res.json())
      .then((data) => setReservationsPresta(data))
      .catch((error) => console.error('Erreur lors du chargement des reservations'))
  }

  useEffect(() => {
    fetchInfoReservationPresta();
  }, []);

  const handleDeleteUser = (userId) => {
    fetch(`http://localhost:3000/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Erreur lors de la suppression de l'utilisateur: ${response.status}`);
        }
      }).then((data) => {
        setMessage(data.message);
        fetchInfoUsers();
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const tableauList = users.filter((user) =>user.role === 'client' && (user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) || user.lastname.toLowerCase().includes(searchQuery.toLowerCase()))).map((user, index) => (
      <li className="presta-div-ul-li" key={index}>
        <div className='presta-div-ul-li-div-premier'>
          <p>{user.lastname}</p>
          <p>{user.firstname}</p>
          <p>{user.mail}</p>
          <p>{user.number}</p>
          <button className="presta-div-ul-li-arrow" aria-label = 'Afficher informations supplémentaires' onClick={() => toggleItem(index)}>
            <FontAwesomeIcon icon={expandedItems.includes(index) ? faArrowDown : faArrowRight} />
          </button>
        </div>

        {expandedItems.includes(index) && window.location.href === 'http://localhost:1234/client/my-reservations' && (
            <div className='presta-div-ul-li-div-troisieme'>
              <p>{listfirst}{user.createdAt}</p>
              <p>{listsecond}{user.role}</p>
            </div>
        )}
        
        {expandedItems.includes(index) && window.location.href != 'http://localhost:1234/client/my-reservations' && (
            <div className='presta-div-ul-li-div-troisieme'>
              <p>{listfirst}{user.createdAt}</p>
              <p>Role : {user.role}</p>
              <div className='presta-div-ul-li-div-troisieme-button'>
                <button className='client-div-ul-li-logo'><FontAwesomeIcon icon={faBan} /> Bloquer {blockwhat}</button>
                <button onClick={() => handleDeleteUser(user.id)} className='client-div-ul-li-logo'><FontAwesomeIcon icon={faTrash} />Supprimer {deletewhat}</button>
              </div>
            </div>
        )}
      </li>
    ));

  const tableauListReservations = reservations.map((reservation, index) => (
      <li className="presta-div-ul-li" key={reservation.id}>
      <div className='presta-div-ul-li-div-premier'>
        <p>{reservation.date.slice(0, 10)}</p>
        <p>{reservation.resService.name}</p>
        <p>{reservation.tookPlace}</p>
        <p>{reservation.cartPrice}€</p>      
        <button className="presta-div-ul-li-arrow" aria-label = 'Afficher informations supplémentaires' onClick={() => toggleItem(index)}>
          <FontAwesomeIcon icon={expandedItems.includes(index) ? faArrowDown : faArrowRight} />
        </button>
      </div>
      {expandedItems.includes(index) && (
          <div className='presta-div-ul-li-div-troisieme'>
            {reservation.extra && <p>Extra :{reservation.extra[0].nomExtra}({reservation.extra[0].prixExtra}€)</p>}
            {!reservation.extra && <p>Extra : Aucun</p>}
            <img src={`http://localhost:3000${reservation.resService.image}`} alt="" />
          </div>
      )}
    </li>
    )
  );

  const tableauListReservationsPrestataire = reservationsPresta.map((reservation, index) => (
    <li className="presta-div-ul-li" key={reservation.id}>
      <div className='presta-div-ul-li-div-premier'>
        <p>{reservation.date.slice(0, 10)}</p>
        <p>{reservation.resService.name}</p>
        <p>{reservation.tookPlace}</p>
        <p>{reservation.cartPrice}€</p>
        <button className="presta-div-ul-li-arrow" aria-label="Afficher informations supplémentaires" onClick={() => toggleItem(index)}>
          <FontAwesomeIcon icon={expandedItems.includes(index) ? faArrowDown : faArrowRight} />
        </button>
      </div>
      {expandedItems.includes(index) && (
        <div className='presta-div-ul-li-div-troisieme'>
          {reservation.extra && (<p>Extra : {reservation.extra[0].nomExtra} ({reservation.extra[0].prixExtra}€)</p>)}
          {!reservation.extra && <p>Extra : Aucun</p>}
          <img src={`http://localhost:3000${reservation.resService.image}`} alt="" />
        </div>
      )}
    </li>
  ));

  const tableauListPresta = users.filter((user) =>user.role === 'prestataire' && (user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) || user.lastname.toLowerCase().includes(searchQuery.toLowerCase()))).map((user, index) => (
      <li className="presta-div-ul-li" key={user.id}>
        <div className='presta-div-ul-li-div-premier'>
          <p>{user.lastname}</p>
          <p>{user.firstname}</p>
          <p>{user.address}</p>
          <p>{user.mail}</p>
          <button className="presta-div-ul-li-arrow" aria-label = 'Afficher informations supplémentaires' onClick={() => toggleItem(index)}>
            <FontAwesomeIcon icon={expandedItems.includes(index) ? faArrowDown : faArrowRight} />
          </button>
        </div>
        
        {expandedItems.includes(index) && (
            <div className='presta-div-ul-li-div-troisieme'>
              <p>{listfirst}{user.number}</p>
              <p>Role : {user.role}</p>
              <div className='presta-div-ul-li-div-troisieme-button'>
                <button className='client-div-ul-li-logo'><FontAwesomeIcon icon={faBan} /> Bloquer {blockwhat}</button>
                <button onClick={() => handleDeleteUser(user.id)} className='client-div-ul-li-logo'><FontAwesomeIcon icon={faTrash} /> Supprimer {deletewhat}</button>
              </div>
            </div>
        )}
      </li>
    ));

    return (
      <>
        <Header />
        <section className="presta">
          <BackChevron />
          <h2 className="presta-title">{title}</h2>
          <div className="presta-div">
            <div className="presta-div-searchbar">
              <input className="presta-div-searchbar-input" type="search" placeholder="Chercher par nom ou prénom" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="presta-div-searchbar-submit" aria-label="Rechercher" type="submit">
                <span className="sr-only">Rechercher</span>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>
            {message && <p className="deleted--success">{message}</p>}
            <ul className="presta-div-ul">
              <li className="presta-div-ul-li-div-deuxieme green">
                <p>{headfirst}</p>
                <p>{headsecond}</p>
                <p>{headthird}</p>
                <p>{headfourth}</p>
              </li>
              {window.location.href === 'http://localhost:1234/admin/presta/account' && tableauListPresta}
              {window.location.href === 'http://localhost:1234/admin/client/account' && tableauList}
              {window.location.href === 'http://localhost:1234/client/my-reservations' && tableauListReservations}
              {window.location.href === 'http://localhost:1234/prestataire/commande' && tableauListReservationsPrestataire}
            </ul>
          </div>
        </section>
        <Footer />
      </>
    );
}


export default list;