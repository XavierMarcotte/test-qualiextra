import './style.scss';
import Header from "../../../components/Header";
import Footer from '../../../components/Footer';
import previewImage from '../service/preview';
import BackChevron from '../../../components/BackChevron';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../AuthContext'
import { useNavigate } from 'react-router-dom';

function etablissement(){
  const { user } = useAuth();
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
      if (!user || (user.role !== 'prestataire' && user.role !== 'admin')){
          console.error("Accès non autorisé")
          navigate('/auth?error=Acces%20Non%20Autorisé')
      }
  }, [user]);

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

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const FormPresta = (formData) => {
    fetch('http://localhost:3000/etablissement/post', {
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

  const handleSubmitFormPresta = (e) => {
    e.preventDefault();
    FormPresta({ name, address, phone, image: imageURL });
    setName('');
    setAddress('');
    setPhone('');
  };

    return(
        <>
          <Header />
            <div className='etablissement'>
              <BackChevron />
              <h1 className='etablissement__title'>Ajouter un établissement</h1>
              <form onSubmit={handleSubmitFormPresta} className='etablissement__form'>
                <label htmlFor="name" className='etablissement__form__label'>Nom*</label>
                <input onChange={(e) => setName(e.target.value)} value={name} className='etablissement__form__input' type='text' id='name' name='name'></input>
                <label htmlFor="adresse" className='etablissement__form__label'>Adresse Postale *</label>
                <input onChange={(e) => setAddress(e.target.value)} value={address} className='etablissement__form__input' type='text' id='adress' name='adress'></input>
                <label htmlFor="fileInput" className='etablissement__form__label'>Photo de l'établissement *</label>
                <input className='etablissement__form__input' type="file" id="fileInput" accept="image/*" multiple onChange={handleImageChange} />
                <div className='etablissement__form__preview' id="preview"></div>
                <label htmlFor="tel" className='etablissement__form__label'>Numéro de téléphone *</label>
                <input onChange={(e) => setPhone(e.target.value)} value={phone} className='etablissement__form__input' type='tel' id='phone' name='tel'></input>
                <button type='submit' className='etablissement__form__btn'>Ajouter Etablissement</button>
              </form>
            </div>
          <Footer />
        </>
    )
}

export default etablissement;