import './style.scss';
import Header from "../../../components/Header";
import Footer from '../../../components/Footer';
import BackChevron from '../../../components/BackChevron/index'
import React, { useState, useEffect } from "react";
import previewImage from './preview';
import { useAuth } from '../../../AuthContext'
import { useNavigate } from 'react-router-dom';
import categories from '../../../components/Reservation/datas';

function Service() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [value, setValue] = useState(1);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [guest, setGuest] = useState('');
  const [limit, setLimit] = useState('');
  const [etablissements, setEtablissements] = useState([]);
  const [selectedEtablissement, setSelectedEtablissement] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [imageURL, setImageURL] = useState(null);
  const [extras, setExtras] = useState([{ nomExtra: "", prixExtra: "" }]);
  const [durationUnit, setDurationUnit] = useState('');
  const [durationNumber, setDurationNumber] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleAddExtras = () => {
    setExtras([...extras, { nomExtra: "", prixExtra: "" }]);
  };

  const handleExtrasChange = (index, event) => {
    const values = [...extras];
    if (event.target.name === "nomExtra") {
      values[index].nomExtra = event.target.value;
    } else {
      values[index].prixExtra = event.target.value;
    }
    setExtras(values);
  };

  useEffect(() => {
      if (!user || (user.role !== 'prestataire' && user.role !== 'admin')){
          console.error("Accès non autorisé")
          navigate('/auth?error=Acces%20Non%20Autorisé')
      }
  }, [user]);


  const handleIncrement = () => {
      setValue(value + 1);
      setDurationNumber(value + 1)
  };

  const handleDecrement = () => {
      if (value > 0) {
      setValue(value - 1);
      setDurationNumber(value - 1);
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

  const categoryCheckboxes = categories.map(categorie => (
    <label className='tags__label' key={categorie.id}>
        <input className='tags__input' type="checkbox" value={categorie.title} checked={selectedCategories.includes(categorie.title)} onChange={handleCategoryChange}/>
        {categorie.title}
    </label>
  ));


  function handleDateChange(e) {
    const startDateInput = document.getElementById("start");
    const endDateInput = document.getElementById("end");
  
    const startDate = new Date(e.target.value);
    const maxDate = new Date(startDate);
    maxDate.setMonth(maxDate.getMonth() + 3);

    const formattedMaxDate = maxDate.toISOString().split("T")[0];
  
    endDateInput.max = formattedMaxDate;
  }
  
  function initialize() {
    const startDateInput = document.getElementById("start");
    startDateInput.addEventListener("change", handleDateChange);
  }
  
  window.addEventListener("DOMContentLoaded", initialize);

  useEffect(() => {
    fetch('http://localhost:3000/prestataire/etablissement')
      .then((response) => response.json())
      .then((data) => {
        setEtablissements(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const FormService = (formData) => {
    fetch('http://localhost:3000/prestataire/service/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch('http://localhost:3000/uploaded-image', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setImageURL(data.url);
  };

  const handleSubmitFormService = (e) => {
    e.preventDefault();
    FormService({ name, price, description, guest, limit, startDate, endDate,  image: imageURL, etablissementId: selectedEtablissement, extras, durationNumber, durationUnit, tags : selectedCategories });
    setValue('');
    setName('');
    setPrice('');
    setLimit('');
    setDescription('');
    setGuest('');
    setStartDate('');
    setEndDate('');
    setExtras([{ nomExtra: "", prixExtra: "" }]);
    setDurationNumber('');
    setDurationUnit('');
    setSelectedCategories([]);
  };
  return (
    <>
      <Header />
      <section className='service'>
        <BackChevron />
        <h1 className='service__title conditions'>Ajouter un service</h1>

        <form onSubmit={handleSubmitFormService} className='service__form'>
          <h2 className='service__form__title'>Sélectionnez l'établissement* :</h2>
          <select id="etablissement" name="etablissement"  onChange={(e) => setSelectedEtablissement(e.target.value)}>
            <option value="">Choisissez un établissement :</option>
            {etablissements.map((etablissement) => (
              <option key={etablissement.id} value={etablissement.id}>
                {etablissement.name} 
              </option>
            ))}
          </select>
          <div className='service__form__photo'>
            <h3 className='service__form__photo__title'>Photo(s)* :</h3>
            <input className='service__form__photo__input' type="file" id="fileInput" accept="image/*" multiple onChange={handleImageChange} />
            <div id="preview"></div>
          </div>
          <div className='service__form__price'>
            <label className='service__form__price__title' htmlFor="name">Nom du service* :</label>
            <input className='service__form__price__input' onChange={(e) => setName(e.target.value)} value={name} type="text" id="name" name="name" required />
            <label className='service__form__price__title' htmlFor="price">Prix du service* :</label>
            <input className='service__form__price__input' onChange={(e) => setPrice(e.target.value)} value={price} type="text" id="price" name="price" required />
            <label className='service__form__description__title' htmlFor="description">Description* :</label>
            <textarea className='service__form__description__input' onChange={(e) => setDescription(e.target.value)} value={description} type="text" id="description" name="description" required></textarea>
            <div className='service__form__time'>
            <h2 className='service__form__time__title'>Durée :</h2>
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
                <select className='service__form__time__info__select' value={durationUnit} onChange={(e) => setDurationUnit(e.target.value)}>
                  <option>Sélectionnez une unité</option>
                  <option value="Jour">Jour</option>
                  <option value="Heure">Heure</option>
                </select>
              </div>
              <div className='service__form__calendar'>
                  <h3 className='service__form__calendar__title'>Disponibilité* :</h3>
                  <label className='service__form__description__title' htmlFor="startDate">Date d'arrivé*</label>
                  <input className='service__form__calendar__date' type="date" id="start" min="2018-01-01" max="2099-12-31" value={startDate} onChange={(e) => {setStartDate(e.target.value); handleDateChange(e);
                  }} />
                  <label className='service__form__description__title' htmlFor="endDate">Date de départ*</label>
                  <input className='service__form__calendar__date' type="date" id="end" min="2018-01-01" max="2099-12-31" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>
          </div>
          <div className='service__form__info'>
            <label className='service__form__info__guest__title' htmlFor="">Sélectionnez des tags en rapport avec votre expérience* :</label>
            <div className='service__form__tags'>
              {categoryCheckboxes}
            </div>
            <label className='service__form__info__guest__title' htmlFor="guest">Limite de convive totale pour l'expérience* :</label>
            <input className='service__form__info__guest__input' onChange={(e) => setGuest(e.target.value)} value={guest} type="text" id="guest" name="guest" required />
            <label className='service__form__info__guest__title' htmlFor="limit">Convive maximum par réservation* :</label>
            <input className='service__form__info__guest__input' onChange={(e) => setLimit(e.target.value)} value={limit} type="text" id="limit" name="limit" required />
            <label className='service__form__info__extra__title' htmlFor="extra">Ajouter des extras</label>
            {extras.map((extra, index) => (
              <div key={index} className='service__form__info__extras'>
                <input
                  name="nomExtra"
                  placeholder="Nom Extra"
                  value={extra.nomExtra}
                  onChange={event => handleExtrasChange(index, event)}
                />
                <input
                  name="prixExtra"
                  placeholder="Prix Extra"
                  value={extra.prixExtra}
                  onChange={event => handleExtrasChange(index, event)}
                />
              </div>
            ))}
            <button className="panier__container__desc__reservation__participants__btn" type="button" onClick={handleAddExtras}>+</button>
            {/* <input className='service__form__info__extra__input' onChange={(e) => setExtra(e.target.value)} value={extra} type="text" id="extra" name="extra" required /> */}
            <button id="btn" type='submit' className='service__form__info__btn'>Ajouter Service</button>
          </div>
          <p>* Champs obligatoires</p>
        </form>
      </section>
      <Footer />
    </>
  )
}
export default Service;