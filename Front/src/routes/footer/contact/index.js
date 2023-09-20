import './style.scss';
import Header from '../../../components/Header';
import BackChevron from '../../../components/BackChevron';
import Footer from '../../../components/Footer';
function Contact(){
    return(
        <>
        <Header/>
        <section className='contact'>
            <BackChevron/>
            <h1 className='contact--title'>Contactez- <span className='color'>nous</span> !</h1>
            <p className='contact--subtitle'>Içi vous pouvez retrouver nos<span className='color bold'> coordonnées </span>!</p>
            <div className='contact--card'>
                <h2>Qualiextra</h2>
                <p>119 rue de l'ouest 75014 Paris</p>
                <p>Mail : arnaud@qualiextra.com</p>
                <p>Tél.: 06 30 35 42 32</p>
                <p>Responsable du projet : Arnaud Agbo</p>
            </div>
        </section>
        <Footer/>
        </>
    )
}
export default Contact;