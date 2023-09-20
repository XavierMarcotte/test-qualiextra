import './style.scss';
import React from 'react';
import Arnaud from "./img/Arnaud.png";

function History() {
    return (
        <section className="history">
            <div className='history__column'>
            <h3 className="history__column__title">Que fait
            <span className="color"> QualiExtra </span>?
            </h3>
            <p className='history__column__desc'><span className="color">L’objectif</span> ? Créer des souvenirs magiques sans partir à l’autre bout du monde.</p>
            <p className='history__column__desc'>On vous permet de booker des expériences complètes à vivre seul, à deux, entre amis, sur Paris.</p>
            <p className='history__column__desc'>On s’adapte à votre envie du moment : on vous trouve THE activité dans votre quartier préféré et on y ajoute une nuit dans un établissement d’excellence / un resto italien qui fait les carbonaras comme celles de la Mamma / un spécialiste du hot-dog végan...</p>
            <p className='history__column__desc'>Vous y pensez, <span className="color"> on va le trouver </span>.</p>
            </div>
            <div className='history__column__fondateur'>
            <img className='history__column__fondateur__image' src={Arnaud} alt="Photo Fondateur" />
            <h3 className='color history__column__fondateur__name'>Arnaud</h3>
            <p className='history__column__fondateur__subtitle'>Fondateur</p>
            </div>
        </section>
    );
}

export default History;