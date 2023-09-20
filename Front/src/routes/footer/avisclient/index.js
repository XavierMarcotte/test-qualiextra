import './style.scss';
import Header from '../../../components/Header';
import BackChevron from '../../../components/BackChevron';
import gustave from './img/gustave.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons';
import Footer from '../../../components/Footer';
function Avisclient(){
    return(
        <>
        <Header/>
        <section className='avisclient'>
            <BackChevron/>
            <h1 className='avisclient--title'>Les avis de nos <span className='color'>clients</span></h1>
            <div className='avisclient--container'>
            <div className='avis-second-div-each-third'>
                <div className='avis-second-div-each-third-items'>
                    <img src={gustave}></img>
                    <div className='avis-second-div-each-third-items-avis'>
                        <p>Gustave Berty</p>
                        <h5>Trop cool!</h5>
                    </div>
                    <i className='material-icons  en_ce_moment_rightside_monte_avis avis-second-div-each-third-items-star'><FontAwesomeIcon className='star' icon={faStar} />4 / 5</i>
                </div>
                <div className='avis-second-div-each-third-text'>
                    <p>Réservation simple et rapide <br></br>Les services sont simples d'accès et faciles à réserver.<br></br> Au top du top !!</p>
                </div>
            </div>
            </div>
        </section>
        <Footer/>
        </>
    )
}
export default Avisclient;