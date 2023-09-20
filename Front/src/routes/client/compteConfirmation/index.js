import './style.scss';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../AuthContext';
import axios from 'axios';
import Transition from '../../../components/transition';
import { useNavigate } from 'react-router-dom';

function ConfirmationCompte() {
    const { user, setUser } = useAuth();

    useEffect(() => {
        if (!user){
            console.error("Accès non autorisé")
            navigate('/auth?error=Acces%20Non%20Autorisé')
        }
    }, [user]);

    const [isConfirmed, setIsConfirmed] = useState(false)
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    if(user){
        useEffect(() => {
            axios.put(`http://localhost:3000/users/${user.id}`, {
                confirmed: true,
            })
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    setUser(response.data.user);
                })
                .catch(error => {
                    setError(`Une erreur s'est produite lors de la mise à jour de vos informations : ${error.message}`);
                });
                setIsConfirmed(true)
        }, []);
        return (
        <>
            <Transition />
        </>
    );
}
}

export default ConfirmationCompte;