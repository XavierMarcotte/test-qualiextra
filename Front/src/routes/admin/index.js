import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BackChevron from '../../components/BackChevron';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Admin_Login() {
    const navigate = useNavigate();

    const [error, setError] = useState('')
    const [mailLog, setMailLog] = useState('');
    const [passwordLog, setPasswordLog] = useState('');


    const handleSubmitLogin = (formData) => {
        fetch('http://localhost:3000/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message.includes('Connexion réussie,')){
                    localStorage.setItem('token', data.token);
                    navigate('&initialisation');
                } else {
                    setError(data.message)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSubmitLog = (e) => {
        e.preventDefault();
        handleSubmitLogin({ mailLog, passwordLog });
        setMailLog('');
        setPasswordLog('');
    };
    return (
        <>
            <Header />
            <section className='admin-presta'>
                <BackChevron />
                <h2 className='admin-presta-title'>Connexion Administrateur</h2>
                {error && <p className='error'>{error}</p>}
                <form onSubmit={handleSubmitLog} className='admin-presta-form'>
                    <label className='' htmlFor="lastname">Adresse E-Mail</label>
                    <input onChange={(e) => setMailLog(e.target.value)} value={mailLog} className='' type="texte" name="lastname" id="lastname" />
                    <label className='' htmlFor="firstname">Mot de passe</label>
                    <input onChange={(e) => setPasswordLog(e.target.value)} value={passwordLog} className='' type="password" name="password" id="password" />
                    <button className='admin-presta-form-submit' type='submit'>Connexion</button>
                </form>
            </section>
            <Footer />
        </>
    )
}


export default Admin_Login;