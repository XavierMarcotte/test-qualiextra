import './style.scss'
import React, { useState} from 'react';
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowDown, faMagnifyingGlass, faTrash, faBan} from '@fortawesome/free-solid-svg-icons';
import BackChevron from '../../../components/BackChevron';
import { useAuth } from '../../../AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const listereservaccount = [
    {firstname: 'xavier', lastname: 'marcotte',numerocommande : 123456789, adresse : '80 rue du Général de Gaulle, Paris 01, France',id : 'ID597618',mail : 'client@test.fr' , numeropresta : '061515151515',  prix : '95euros' , servicereserve : 'degustation vin en plein air' , date : '18/07/2023', },
    {firstname: 'brigitte', lastname: 'bardot',numerocommande : 123456789, adresse : '80 rue du Général de Gaulle, Paris 01, France',id : 'ID597618',mail : 'client@test.fr' , numeropresta : '061515151515',  prix : '95euros' , servicereserve : 'degustation vin en plein air' , date : '18/07/2023', },
    {firstname: 'manu', lastname: 'du69' ,numerocommande : 123456789, adresse : '80 rue du Général de Gaulle, Paris 01, France',id : 'ID597618',mail : 'client@test.fr' , numeropresta : '061515151515',  prix : '95euros' , servicereserve : 'degustation vin en plein air' , date : '18/07/2023', },
    {firstname: 'Jean', lastname: 'Dujardin',numerocommande : 123456789, adresse : '80 rue du Général de Gaulle, Paris 01, France',id : 'ID597618',mail : 'client@test.fr' , numeropresta : '061515151515',  prix : '95euros' , servicereserve : 'degustation vin en plein air' , date : '18/07/2023', },
    {firstname: 'xavier', lastname: 'marcotte',numerocommande : 123456789, adresse : '80 rue du Général de Gaulle, Paris 01, France',id : 'ID597618',mail : 'client@test.fr' , numeropresta : '061515151515',  prix : '95euros' , servicereserve : 'degustation vin en plein air' , date : '18/07/2023', },
    {firstname: 'brigitte', lastname: 'bardot',numerocommande : 123456789, adresse : '80 rue du Général de Gaulle, Paris 01, France',id : 'ID597618',mail : 'client@test.fr' , numeropresta : '061515151515',  prix : '95euros' , servicereserve : 'degustation vin en plein air' , date : '18/07/2023', },
    {firstname: 'manu', lastname: 'du69' ,numerocommande : 123456789, adresse : '80 rue du Général de Gaulle, Paris 01, France',id : 'ID597618',mail : 'client@test.fr' , numeropresta : '061515151515',  prix : '95euros' , servicereserve : 'degustation vin en plein air' , date : '18/07/2023', },
    {firstname: 'Jean', lastname: 'Dujardin',numerocommande : 123456789, adresse : '80 rue du Général de Gaulle, Paris 01, France',id : 'ID597618',mail : 'client@test.fr' , numeropresta : '061515151515',  prix : '95euros' , servicereserve : 'degustation vin en plein air' , date : '18/07/2023', },
    {firstname: 'xavier', lastname: 'marcotte',numerocommande : 123456789, adresse : '80 rue du Général de Gaulle, Paris 01, France',id : 'ID597618',mail : 'client@test.fr' , numeropresta : '061515151515',  prix : '95euros' , servicereserve : 'degustation vin en plein air' , date : '18/07/2023', },
    {firstname: 'brigitte', lastname: 'bardot',numerocommande : 123456789, adresse : '80 rue du Général de Gaulle, Paris 01, France',id : 'ID597618',mail : 'client@test.fr' , numeropresta : '061515151515',  prix : '95euros' , servicereserve : 'degustation vin en plein air' , date : '18/07/2023', },
    {firstname: 'manu', lastname: 'du69' ,numerocommande : 123456789, adresse : '80 rue du Général de Gaulle, Paris 01, France',id : 'ID597618',mail : 'client@test.fr' , numeropresta : '061515151515',  prix : '95euros' , servicereserve : 'degustation vin en plein air' , date : '18/07/2023', },
    {firstname: 'Jean', lastname: 'Dujardin',numerocommande : 123456789, adresse : '80 rue du Général de Gaulle, Paris 01, France',id : 'ID597618',mail : 'client@test.fr' , numeropresta : '061515151515',  prix : '95euros' , servicereserve : 'degustation vin en plein air' , date : '18/07/2023', },
    {firstname: 'xavier', lastname: 'marcotte',numerocommande : 123456789, adresse : '80 rue du Général de Gaulle, Paris 01, France',id : 'ID597618',mail : 'client@test.fr' , numeropresta : '061515151515',  prix : '95euros' , servicereserve : 'degustation vin en plein air' , date : '18/07/2023', },
    {firstname: 'brigitte', lastname: 'bardot',numerocommande : 123456789, adresse : '80 rue du Général de Gaulle, Paris 01, France',id : 'ID597618',mail : 'client@test.fr' , numeropresta : '061515151515',  prix : '95euros' , servicereserve : 'degustation vin en plein air' , date : '18/07/2023', },
    {firstname: 'manu', lastname: 'du69' ,numerocommande : 123456789, adresse : '80 rue du Général de Gaulle, Paris 01, France',id : 'ID597618',mail : 'client@test.fr' , numeropresta : '061515151515',  prix : '95euros' , servicereserve : 'degustation vin en plein air' , date : '18/07/2023', },
    {firstname: 'Jean', lastname: 'Dujardin',numerocommande : 123456789, adresse : '80 rue du Général de Gaulle, Paris 01, France',id : 'ID597618',mail : 'client@test.fr' , numeropresta : '061515151515',  prix : '95euros' , servicereserve : 'degustation vin en plein air' , date : '18/07/2023', },
    {firstname: 'xavier', lastname: 'marcotte',numerocommande : 123456789, adresse : '80 rue du Général de Gaulle, Paris 01, France',id : 'ID597618',mail : 'client@test.fr' , numeropresta : '061515151515',  prix : '95euros' , servicereserve : 'degustation vin en plein air' , date : '18/07/2023', },
    {firstname: 'brigitte', lastname: 'bardot',numerocommande : 123456789, adresse : '80 rue du Général de Gaulle, Paris 01, France',id : 'ID597618',mail : 'client@test.fr' , numeropresta : '061515151515',  prix : '95euros' , servicereserve : 'degustation vin en plein air' , date : '18/07/2023', },
    {firstname: 'manu', lastname: 'du69' ,numerocommande : 123456789, adresse : '80 rue du Général de Gaulle, Paris 01, France',id : 'ID597618',mail : 'client@test.fr' , numeropresta : '061515151515',  prix : '95euros' , servicereserve : 'degustation vin en plein air' , date : '18/07/2023', },
    {firstname: 'Jean', lastname: 'Dujardin',numerocommande : 123456789, adresse : '80 rue du Général de Gaulle, Paris 01, France',id : 'ID597618',mail : 'client@test.fr' , numeropresta : '061515151515',  prix : '95euros' , servicereserve : 'degustation vin en plein air' , date : '18/07/2023', },
];

function admin_listereserv() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'admin'){
            console.error("Unauthorized access")
            navigate('/auth')
        }
    }, [user]);
    
    const [expandedItems, setExpandedItems] = useState([]);
  
    const toggleItem = (index) => {
      if (expandedItems.includes(index)) {
        setExpandedItems(expandedItems.filter((itemIndex) => itemIndex !== index));
      } else {
        setExpandedItems([...expandedItems, index]);
      }
    };
  
    const listereservaccountList = listereservaccount.map((item, index) => (
      <li className="listereserv-div-ul-li" key={index}>
        <p className="listereserv-div-ul-li-firstname">{item.firstname}</p>
        <p className="listereserv-div-ul-li-lastname">{item.lastname}</p>
        <p className="listereserv-div-ul-li-number">{item.numerocommande}</p>
        <p className="listereserv-div-ul-li-email">{item.id}</p>
        <button className="listereserv-div-ul-li-arrow" aria-label = 'Afficher informations supplémentaires' onClick={() => toggleItem(index)}>
          <FontAwesomeIcon icon={expandedItems.includes(index) ? faArrowDown : faArrowRight} />
        </button>
        {expandedItems.includes(index) && (
          // Mettre une div pour mieux gérer le display grid
            <>
            <p className="listereserv-div-ul-li-listereservnumber">Mail client : {item.mail}</p>
            <p className="listereserv-div-ul-li-listereservnumber">Numéro presta : {item.numeropresta}</p>
            <p className="listereserv-div-ul-li-listereservnumber">Service réservé : {item.servicereserve}</p>
            <p className="listereserv-div-ul-li-listereservnumber">Prix : {item.prix}</p>
            <p className="listereserv-div-ul-li-listereservnumber">Date : {item.date}</p>
            <button className='listereserv-div-ul-li-logo'><FontAwesomeIcon icon={faBan} />Bloquer compte listereserv</button>
            <button className='listereserv-div-ul-li-logo'><FontAwesomeIcon icon={faTrash} />Supprimer compte listereserv</button>
            </>
        )}
      </li>
    ));
  
    return (
      <>
        <Header />
        <section className="listereserv">
          <BackChevron />
          <h2 className="listereserv-title">Liste des réservations</h2>
          <div className="listereserv-div">
            <div className="listereserv-div-searchbar">
              <input className="listereserv-div-searchbar-input" type="search" placeholder="Chercher une réservation.." />
              <button className="listereserv-div-searchbar-submit"  aria-label="Rechercher" type="submit">
                <span class="sr-only">Rechercher</span>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>
            <ul className="listereserv-div-ul">
              <li className="listereserv-div-ul-li green">
                <p>Prénom :</p>
                <p>Nom :</p>
                <p>Numéro de commande</p>
                <p>ID client</p>
                <p></p>
              </li>
              {listereservaccountList}
            </ul>
          </div>
        </section>
        <Footer />
      </>
    );
  }
  
  export default admin_listereserv;