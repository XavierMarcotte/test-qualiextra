import './style.scss';
import Header from '../../../components/Header';
import BackChevron from '../../../components/BackChevron';
import Footer from '../../../components/Footer';
function Termes(){
    return(
        <>
        <Header/>
        <section className='termes'>
            <BackChevron/>
            <h1 className='termes--title'>Termes & <span className='color'>Condititons</span></h1>
            <p className='termes--subtitle'>ACCORD ENTRE L'UTILISATEUR ET<span className='color bold'> Qualiextra </span>!</p>
        </section>
        <Footer/>
        </>
    )
}
export default Termes;