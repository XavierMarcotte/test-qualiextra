import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.scss';
import BackChevron from '../BackChevron';

function prestaInformationsForm(){
        const { user, setUser } = useAuth();
        const userId = user.id;
        const [firstname, setFirstname] = useState('');
        const [lastname, setLastname] = useState('');
        const [address, setAddress] = useState('');
        const [number, setNumber] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState(null);
      
        const navigate = useNavigate();
        useEffect(() => {
          axios.get(`http://localhost:3000/users/${userId}`)
            .then(response => {
              setFirstname(response.data.firstname);
              setLastname(response.data.lastname);
              setAddress(response.data.address);
              setNumber(response.data.number);
            });
        }, [userId]);
      
        const handleSubmit = event => {
          event.preventDefault();
      
          axios.put(`http://localhost:3000/users/prestataire/${userId}`, {
            firstname,
            lastname,
            address,
            number,
            password,
          })
          .then(response => {
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user)
            navigate('/prestataire/informations')
          })
          .catch(error => {
            setError(`Une erreur s'est produite lors de la mise à jour de vos informations : ${error.message}`);
          });
        };
      
        return (
          <section className='changeInfos'>
            <BackChevron />
            <h2 className='changeInfos-title'>Modifier mes informations :</h2>
            <form className='changeInfos-form' onSubmit={handleSubmit}>
              {error && <p className="error">{error}</p>}
              <label className='changeInfos-form-label' htmlFor="name">Prénom :</label>
              <input className='changeInfos-form-input' type="text" value={firstname} onChange={e => setFirstname(e.target.value)} />
              <label className='changeInfos-form-label' htmlFor="name">Nom :</label>
              <input className='changeInfos-form-input' type="text" value={lastname} onChange={e => setLastname(e.target.value)} />
              <label className='changeInfos-form-label' htmlFor="name">Adresse siège sociale :</label>
              <input className='changeInfos-form-input' type="text" value={address} onChange={e => setAddress(e.target.value)} />
              <label className='changeInfos-form-label' htmlFor="name">Numéro de téléphone :</label>
              <input className='changeInfos-form-input' type="text" value={number} onChange={e => setNumber(e.target.value)} />
              <label className='' htmlFor="password">Changer de mot de passe *</label>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className='' type="password" name="password" id="password" />
              <button className='admin-list-item-button' type="submit">Mettre à jour mes nouvelles informations</button>
            </form>
          </section>
        );
}


export default prestaInformationsForm;