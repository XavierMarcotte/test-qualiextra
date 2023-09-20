import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';
import './style.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackChevron from '../../BackChevron'


const UpdateAccount = () => {
  const { user, setUser } = useAuth();
  const userId = user.id;
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:3000/users/${userId}`)
      .then(response => {
        setFirstname(response.data.firstname);
        setLastname(response.data.lastname);
      });
  }, [userId]);

  const handleSubmit = event => {
    event.preventDefault();

    axios.put(`http://localhost:3000/users/${userId}`, {
      firstname,
      lastname
    })
    .then(response => {
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user)
      navigate('/client/account/informations')
    })
    .catch(error => {
      setError(`Une erreur s'est produite lors de la mise à jour de vos informations : ${error.message}`);
    });
  };

  return (
    <div className='update'>
      <BackChevron/>
    <h2 className='update-title'>Modifications des informations personnelles</h2>
    <form className='update-account' onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <label>Nom
      <input className='update-account-input' type="text" value={firstname} onChange={e => setFirstname(e.target.value)} /> </label>

    <label for>Prénom
      <input className='update-account-input' type="text" value={lastname} onChange={e => setLastname(e.target.value)} /></label>
      <button className='update-account-btn' type="submit">Mettre à jour</button>
    </form>
    </div>
  );
};

export default UpdateAccount;