import './style.scss';
import imageok from './img/imageok.png';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Confirmation(){
    return(
        <>
            <Header/>
            <section className='confirmation--container'>
                <h1 className='confirmation--container--title'>Confirmation de <span className='color'>réservation</span> </h1>
                <h2 className='confirmation--container--subtitle'>Lieu réservé avec succès</h2>
                <img className='confirmation--container--image' src={imageok} alt="Image de confirmation de réservation" />
                <p className='confirmation--container--desc'>Tu vas bientôt recevoir un mail avec les détails.</p>
                <p className='confirmation--container--desc'>Tu pourras également les retouver dans ton espace  <a href='/client/my-reservations'><span className='color conditions'>mes réservation </span></a> </p>
                <a href='/'>
                <button className='btn'>Retour à la page d'accueil</button></a>
                <a href='/panier' className='link color'>Annuler ou modifier ma réservation</a>
            </section>
            <Footer/>
        </>
    )
}
export default Confirmation;