import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import './style.scss'
import BackChevron from '../../../components/BackChevron';
import { useAuth } from '../../../AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function admin_create() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'admin'){
            console.error("Unauthorized access")
            navigate('/auth')
        }
    }, [user]);

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [mail, setMail] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [role, setRole] = useState('prestataire');
    const [message, setMessage] = useState('');

    const handleSubmitForm = (formData) => {
        fetch('http://localhost:3000/users/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                setMessage(data.message);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSubmitForm({ role, lastname, firstname, mail, address, number, });
        setRole('prestataire')
        setFirstName('');
        setLastName('');
        setMail('');
        setAddress('');
        setNumber('');
    };

    return (
        <>
            <Header />
            <section className='admin-presta'>
                <BackChevron />
                <h2 className='admin-presta-title'>Ajouter un prestataire :</h2>
                {message && <p className='validation-addition'>{message}</p>}
                <form onSubmit={handleSubmit} className='admin-presta-form'>
                    <label className='' htmlFor="lastname">Nom *</label>
                    <input onChange={(e) => setLastName(e.target.value)} value={lastname} className='' type="texte" name="lastname" id="lastname" />
                    <label className='' htmlFor="firstname">Prénom *</label>
                    <input onChange={(e) => setFirstName(e.target.value)} value={firstname} className='' type="texte" name="firstname" id="firstname" />
                    <label className='' htmlFor="adress">Adresse siège social *</label>
                    <input onChange={(e) => setAddress(e.target.value)} value={address} className='' type="texte" name="adress" id="adress" />
                    <label className='' htmlFor="phone">Téléphone du prestataire *</label>
                    <input onChange={(e) => setNumber(e.target.value)} value={number} className='' type="tel" name="phone" id="phone" />
                    <label className='' htmlFor="email">Adresse E-mail *</label>
                    <input onChange={(e) => setMail(e.target.value)} value={mail} className='' type="text" name="email" id="email" />

                    
                    <button className='admin-presta-form-submit' type='submit'>Ajouter Prestataire</button>
                    <p>*Champs obligatoires</p>
                </form>
            </section>
            <Footer />
        </>
    )
}


export default admin_create;