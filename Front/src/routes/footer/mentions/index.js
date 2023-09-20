import './style.scss';
import Header from '../../../components/Header';
import BackChevron from '../../../components/BackChevron';
import Footer from '../../../components/Footer';
function Mentions(){
    return(
        <>
        <Header/>
        <section className='mentions'>
            <BackChevron/>
            <h1 className='mentions--title'>Mentions <span className='color'>légales</span></h1>
            <p className='mentions--desc'>Voici nos mentions légales !</p>
        </section>
        <Footer/>
        </>
    )
}
export default Mentions;