import './style.scss';
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import Button from '../../components/Button/index'
import BackChevron from '../../components/BackChevron/index'
import React from 'react';
import React, { useState, useEffect } from "react";
import previewImage from './preview';

function service() {

  const [value, setValue] = useState(1);

  const handleIncrement = () => {
      setValue(value + 1);
  };

  const handleDecrement = () => {
      if (value > 0) {
      setValue(value - 1);
      }
  };

  useEffect(() => {
    const fileInput = document.getElementById('fileInput');
    const previewElement = document.getElementById('preview');

    const handleFileChange = () => {
      previewImage(fileInput, previewElement);
    };

    fileInput.addEventListener('change', handleFileChange);

    return () => {
      fileInput.removeEventListener('change', handleFileChange);
    };
  }, []);

  const addOptionsToDropdown = () => {
    const dropdown = document.getElementById('etablissement');

    const option1 = document.createElement('option');
    option1.value = 'sabai thai spa';
    option1.text = 'Sabai thai spa';
    dropdown.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = 'le Ritz';
    option2.text = 'Le Ritz';
    dropdown.appendChild(option2);

    const option3 = document.createElement('option');
    option3.value = 'plaza Athénée';
    option3.text = 'Plaza Athénée';
    dropdown.appendChild(option3);

    const option4 = document.createElement('option');
    option3.value = 'plaza Athénée';
    option3.text = 'Plaza Athénée';
    dropdown.appendChild(option3);
  };
  window.onload = addOptionsToDropdown;

  return (
    <>
      <Header />
      <section className='service'>
        <BackChevron />
        <h1 className='service__title conditions'>Ajouter un service</h1>

        <form className='service__form'>
          <h3 className='service__form__title'>Sélectionnez l'établissement*</h3>
          <select id="etablissement" name="etablissement" required>
            <option value="">Choisissez un établissement</option>
          </select>
          <div className='service__form__photo'>
            <h3 className='service__form__photo__title'>Photos</h3>
            <input className='service__form__photo__input' type="file" id="fileInput" accept="image/*" multiple />
            <div id="preview"></div>
          </div>
          <div className='service__form__price'>
            <label className='service__form__price' htmlFor="prix">Prix du service*</label>
            <input className='service__form__price__input' type="text" id="prix" name="prix" required />
            <label className='service__form__description' for="description">Description*</label>
            <input className='service__form__description__input' type="text" id="description" name="description" required readonly></input>
            <div className='service__form__time'>
            <h2 className='service__form__time__title'>Durée</h2>
              <div className='service__form__time__info'>
                <div className='service__form__time__info__participants'>
                  
                  <p className="counter service__form__time__info__participants" id="counter" name="result">
                      {value}
                  </p>
                  <button className="panier__container__desc__reservation__participants__btn" onClick={handleDecrement}>
                      -
                  </button>
                  <button className="panier__container__desc__reservation__participants__btn" onClick={handleIncrement}>
                      +
                  </button>
                </div>
                <select className='service__form__time__info__select'>
                  <option value="Heure">Heure</option>
                  <option value="Jour">Jour</option>
                </select>
              </div>
                <div className='service__form__calendar'>
                  <h3 className='service__form__calendar__title'>Disponibilité</h3>
                  <input className='service__form__calendar__date' type="date" id="start" required="required" min="2018-01-01" max="2099-12-31" />
                  <input className='service__form__calendar__date' type="date" id="start" required="required" min="2018-01-01" max="2099-12-31" />
                </div>
            </div>
          </div>
          <div className='service__form__info'>
          <label className='service__form__info__guest' htmlFor="guest">Limite de convive*</label>
          <input className='service__form__info__guest__input' type="text" id="guest" name="guest" required />
          <label className='service__form__info__extra' htmlFor="extra">Ajouter des extras*</label>
          <input className='service__form__info__extra__input' type="text" id="extra" name="extra" required />
          <Button  name="Créer" style="service__form__info__btn" id="btn" />
          </div>
        </form>
      </section>
      <Footer />
    </>


  )
}
export default service;