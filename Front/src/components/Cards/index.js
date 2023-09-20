import './style.scss';
import React from 'react';
import Cardprop from '../Cards/cardprop';
import { shuffleArray } from '../faireavec';
import { useEffect, useState } from "react";

function CardSection() {
    const [service, setService] = useState([]);
    
    const fetchInfoService = () => {
        return fetch('http://localhost:3000/prestataire/service')
            .then((res) => res.json())
            .then((data) => setService(data))
            .catch((error) => console.error('Erreur lors du chargement des utilisateurs:', error));
    };
    useEffect(() => {
        fetchInfoService();
    }, []);

    const selectedServices = shuffleArray(service).slice(0, 3);
    const serviceCard = selectedServices.map((user, index) => {
        const address = user.etablissementId
        return (
            <Cardprop
                key= {user.id}
                id={user.id}
                etablissementId={user.etablissementId}
                nom={user.name}
                photo={user.image}
            />
        )
    });

    return (
        <section className='card'>
            <h3 className='card-title'>Nos <span className='color'>pépites</span> </h3>
            <div className='homepagepresta-div-left-article card-list'>
                {serviceCard}
            </div>
        </section>
    );
}

export default CardSection;
