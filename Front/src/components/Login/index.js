import './style.scss';
import google from "./img/google.png";
import apple from "./img/apple.png";
import facebook from "./img/facebook.png";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import BackChevron from '../BackChevron';


function Login() {
    const { user } = useAuth();
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [mail, setMail] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [role, setRole] = useState('client');
    const [password, setPassword] = useState('')
    const [mailLog, setMailLog] = useState('');
    const [passwordLog, setPasswordLog] = useState('')
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [errorFromURL, setErrorFromURL] = useState('');
    const [errorConditions, setErrorConditions] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false)

    const handleSubmitForm = async (formData) => {
        try{
            const response = await fetch(`http://localhost:3000/users/checkmail/${formData.mail}`, {
                method: 'GET',
            });
            const data = await response.json();
            if (data.emailExists) {
                setErrorConditions('Adresse mail déjà utilisée');
                return;
            }
        
        fetch('http://localhost:3000/users/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.newUser){
                    if (data.newUser){
                        setError(data.message);
                        handleSubmitLogin({
                            mailLog: formData.mail,
                            passwordLog: formData.password,
                        }, '/starting');
                    } else {
                        console.error(error);
                    }
                } else {
                    setError(data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    } catch(error){
        console.error(error);
    }
};

    const handleSubmit = (e) => {
        e.preventDefault();
        const userConditions = document.getElementById('user_conditions');
        if (!userConditions.checked){
            setErrorConditions(`Veuillez accepter les conditions d'utilisation`);
            return;
        }
        handleSubmitForm({ lastname, firstname, mail, address, number, role, password, isConfirmed });
        setFirstName('');
        setLastName('');
        setMail('');
        setAddress('');
        setNumber('');
        setRole('client')
        setPassword('')
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');
        if (error) {
            setErrorFromURL(error);
        }
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');
        if (error) {
            setErrorFromURL(error);
        } else if (user && user.role === 'prestataire'){
            navigate('/prestataire')
        } else if(user && user.role === 'client') {
            navigate('/');
        }
    }, [])

    const handleSubmitLogin = (formData, url) => {
        
        fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message.includes('Connexion réussie,')) {
                    localStorage.setItem('token', data.token);
                    navigate(url);
                    navigate(0);
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
        handleSubmitLogin({ mailLog, passwordLog, });
        setMail('');
        setPassword('');
    };

    return (
        <>
        
        <div>{errorFromURL && <h1 className='error'>{errorFromURL}</h1>}</div>
        {user && 
            <section className='login--container'>
                <ul className='admin-list'> 
                    <li className='admin-list-item'>
                        <a className='admin-list-item-button admin-list-item-button-client' href='/'>Page d'accueil</a>
                    </li>
                    {user.role === "client" &&
                    <li className='admin-list-item'>
                        <a className='admin-list-item-button admin-list-item-button-client' href='/client/account/informations'>Informations du compte</a>
                    </li>
                    }
                </ul>
            </section>
            }
        {!user &&
        <section className='login--container'>
            <BackChevron/>
            <div className='login--container--left'>
                
                <h2 className='login--container--title'><span className='color'>Créer</span> un compte</h2>
                <form onSubmit={handleSubmit} className='login--container--form' id="left-form" action="POST">
                    <div className="login--container--form--names">
                        <div className="login--container--form--name">
                            <label className="login--container--form--labels" htmlFor='lastname'>Nom*</label>
                            <input onChange={(e) => setLastName(e.target.value)} value={lastname} className='login--container--form--inputs' type="text" name="lastname" id="lastname" />
                        </div>
                        <div className="login--container--form--name">
                            <label className="login--container--form--labels" htmlFor='firstname'>Prénom*</label>
                            <input onChange={(e) => setFirstName(e.target.value)} value={firstname} className='login--container--form--inputs' type="text" name="firstname" id="firstname" />
                        </div>
                    </div>
                    <label className="login--container--form--labels" htmlFor="email">Adresse mail*</label>
                    <input onChange={(e) => setMail(e.target.value)} value={mail} className='login--container--form--inputs' type="email" name="email" id="email" />
                    <label className="login--container--form--labels" htmlFor="password">Mot de passe*</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className='login--container--form--inputs' type="password" name="password" id="password" />
                    <label className="login--container--form--labels" htmlFor="tel">Téléphone</label>
                    <input onChange={(e) => setNumber(e.target.value)} value={number} className='login--container--form--inputs' type='tel' name="tel" id="tel" />
                    <div className='login--container--form--footer'>
                    {errorConditions && <p className='error'>{errorConditions}</p>}
                        <div className='login--container--form--footer--inputs'>
                            <label className='checkbox-container' htmlFor="user_conditions">
                                <input type="checkbox" name="user_conditions" id="user_conditions" />
                                <span className="checkbox-checkmark"></span>
                                * J'ai lu et accepté les <a href='/termes' target='_blank' className="conditions">conditions d'utilisation</a> de QualiExtra
                            </label>
                            <label className='checkbox-container' htmlFor="newsletter">
                                <input type="checkbox" name="newsletter" id="newsletter" />
                                <span className="checkbox-checkmark"></span>
                                Je veux être tenu(e) informé(e) des nouvelles de QualiExtra
                            </label>
                        </div>
                        <div className='login--container--form--footer--btn'>
                            <button className="container--btn" type='submit'>Suivant</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="login--container--right">
                <h2 className='login--container--title'>Se <span className='color'>connecter</span></h2>
                {error && <p className='error'>{error}</p>}
                <form onSubmit={handleSubmitLog} className='login--container--form' id='right-form' action="POST">
                    <label className="login--container--form--labels" htmlFor="email_auth">Adresse mail*</label>
                    <input onChange={(e) => setMailLog(e.target.value)} value={mailLog} className='login--container--form--inputs' type="email" name="email_auth" id="email_auth" />
                    <label className="login--container--form--labels" htmlFor="password_auth">Mot de passe*</label>
                    <input onChange={(e) => setPasswordLog(e.target.value)} value={passwordLog} className='login--container--form--inputs' type="password" name="password_auth" id="password_auth" />
                    <p className="login--container--form--connectwith">Se connecter avec</p>
                    <ul className='login--container--form--icons'>
                        <li><button className='login--container--form--icons_btn' type='submit'><img className='container--form--icons_icon' src={google} alt="" /></button></li>
                        <li><button className='login--container--form--icons_btn' type='submit'><img className='container--form--icons_icon' src={apple} alt="" /></button></li>
                        <li><button className='login--container--form--icons_btn' type='submit'><img className='container--form--icons_icon' src={facebook} alt="" /></button></li>
                    </ul>
                    <div className='login--container--form--footer'>
                        <div className='login--container--form--footer--inputs'>
                        </div>
                        <div className='login--container--form--footer--btn'>
                            <button className="container--btn" type='submit'>Suivant</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        }
        </>
    )
}

export default Login;