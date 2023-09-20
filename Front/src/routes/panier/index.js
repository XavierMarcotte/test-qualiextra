import './style.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Insert from '../../components/Insert';
import BackChevron from '../../components/BackChevron';
import visa from '../panier/img/visa.png';
import american from '../panier/img/american.png';
import mastercard from '../panier/img/mastercard.png';
import paypal from '../panier/img/paypal.png';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { useEffect, useState } from 'react';

function Panier() {
    const { user } = useAuth();
    const [carts, setCarts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalExtrasPrice, setTotalExtrasPrice] = useState(0);
    const [cartPrice, setCartPrice] = useState(0);
    const [estab, setEstab] = useState({});

    const handleDeleteCart = (cartId) => {
        fetch(`http://localhost:3000/cart/${cartId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Erreur lors de la suppression du panier: ${response.status}`);
                }
            }).then(() => {
                fetchCarts();
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    const handleReservation = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/reservation/${user.id}`, {
                userId: user.id,
                user,
                cartPrice: Number(cartPrice),
                carts: carts.map(cart => ({
                    resServiceId: cart.service.id,
                    establishmentId: cart.service.etablissementId,
                    tookPlace: cart.tookPlace,
                    date: cart.date,
                    extra: cart.extra,
                    service: cart.service,
                })),
            });
            if (response.status === 201) {
                await axios.delete(`http://localhost:3000/cart/user/${user.id}`,{
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                fetchCarts();
                window.location.href = `/confirmation`;
            }
        } catch (error) {
            console.error('Error during reservation:', error);
            console.error("Une erreur s'est produite lors de la réservation. Veuillez réessayer");
        }
    }

    const fetchCarts = async () => {
        try{
            const response = await axios.get(`http://localhost:3000/cart/${user.id}`)
            setCarts(response.data);
            let totalPrice = 0;
            let totalExtrasPrice = 0;
            response.data.forEach(cart => {
                totalPrice += cart.service.price * cart.tookPlace;
                cart.extra.forEach(extra => {
                    totalExtrasPrice += Number(extra.prixExtra);
                })
            });
            setTotalPrice(totalPrice);
            setTotalExtrasPrice(totalExtrasPrice);
            setCartPrice(totalPrice + totalExtrasPrice + 10)
        } catch (error) {
            console.error(`Erreur lors du chargement du panier`, error);
        }
    }

    const fetchEstablish = async (establishmentId) => {
        if (estab[establishmentId]){

            return;
        }
        try{
            const response = await axios.get(`http://localhost:3000/prestataire/etablissement/${establishmentId}`)
            setEstab(prevEstab => ({
                ...prevEstab,
                [establishmentId]: response.data
            }));
        } catch(error) {
            console.error(`Erreur lors du chargement des établissements`)
        }
    }

    useEffect(() => {
        fetchCarts();
    }, []);

    useEffect(() => {
        carts.forEach((cart) => fetchEstablish(cart.service.etablissementId));
    }, [carts]);
    
    const allCarts = carts.map((cart) => {
        const establish = estab[cart.service.etablissementId];
        return (
        <div className='panier--container--desc'>
        <img className='panier--container--desc--image' src={`http://localhost:3000${cart.service.image}`} alt='Photo du Service'/>
        <div className='panier--container--desc--info'>
            <h2 className='panier--container--desc--info--title conditions'>{cart.service.name}</h2>
            <p>Prix : {cart.service.price}€</p>
            {cart.extra.length > 0 && 
            <>
                <p>Extra 1 : {cart.extra[0].nomExtra} ({cart.extra[0].prixExtra}€)</p>
            </>
            }
            {cart.extra.length > 1 && <><p>Extra 2 : {cart.extra[1].nomExtra} ({cart.extra[1].prixExtra}€)</p><p>Prix :{cart.extra[1].prixExtra}€</p></>}
            <p>Nombre de place réservées : {cart.tookPlace}</p>
            <h3 className='color panier--container--desc--info--subtitle'>{establish && establish.name}</h3>
            <a className='panier--container--desc--info--more' href={`/details/${cart.service.etablissementId}/${cart.service.id}`} >Plus de détails</a>
            <div className="panier--container--desc--reservation">
                <div className='panier--container--desc--reservation--date'>
                    <label className='color panier--container--desc--info--text' for="start">Date
                    </label>
                    <p className='panier--container--desc--info--date' type="date" id="start" required="required" min="2018-01-01" max="2099-12-31">{cart.date.slice(0, 10)}</p>
                </div>
                <div className='panier--container--desc--reservation--container'>
                <p className='panier--container--desc--info--text--participant color'>Participants</p>
                {cart.tookPlace}
                </div>
            </div>
            <a className='panier--container--desc--modify' href={`/details/${cart.service.etablissementId}/${cart.service.id}`} onClick={() => handleDeleteCart(cart.id)}>Modifier/Supprimer</a>
        </div>
    </div>
    )});
    return(
        <>
            <Header/>
            <section className='panier'>
                <BackChevron />
                <h1 className='panier--title'><span className='color'>Votre </span>Réservation</h1>
                <div className='panier--container'>
                    <div className='panier--container--carts'>
                    {allCarts}
                    </div>
                    <div className='panier--container--service'>
                        <div className='panier--container--service--bill'>
                            <div className='panier--container--service--bill--objet'>
                                <p className='color'>Prix:</p>
                                <p>Package:</p>
                                <p>Extra(s):</p>
                                <p>Frais de réservation: </p>
                                </div>
                                <div className='panier--container--service--bill--objet--price'>
                                    <p>{totalPrice + totalExtrasPrice + 10}€</p>
                                    <p>{totalPrice}€</p>
                                    <p>{totalExtrasPrice}€</p>
                                    <p>10€</p>
                            </div>
                        </div>
                        <a className='panier--container--service--button' onClick={handleReservation}>Réserver</a>
                        <a className='panier--container--service--cancel'
                        href="/search"><p>Annuler</p></a>
                    </div>
                </div>
                <div className='panier--paiement'>
                    <h3 className='panier--paiement--title conditions'>Moyens de <span className='color'>paiement</span></h3>
                    <div className='panier--paiement--links'>
                        <a href='https://www.mastercard.fr/fr-fr.html'><img className='link' src={mastercard} alt="Lien vers Mastercard" /></a>
                        <a href='https://www.paypal.com/fr/home'><img className='link' src={paypal} alt="Lien vers Paypal" /></a>
                        <a href='https://www.americanexpress.com/fr-fr/'><img className='link' src={american} alt="Lien vers American Express" /></a>
                        <a href='https://www.visa.fr/'><img className='link' src={visa} alt="Lien vers Visa" /></a>
                    </div>
                </div>
            </section>
            <Insert/>
            <Footer/>
        </>
    )
}
export default Panier;