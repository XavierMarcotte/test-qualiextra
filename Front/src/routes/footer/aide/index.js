import './style.scss';
import Header from '../../../components/Header';
import BackChevron from '../../../components/BackChevron';
import Footer from '../../../components/Footer';
function Aide(){
    return(
        <>
        <Header/>
        <section className='aide'>
            <BackChevron/>
            <h1 className='aide--title'>Aide &<span className='color'> Service clients</span></h1>
        <p className='aide--desc'>En cas de problème veuillez nous contacter par mail</p>
        </section>
        <Footer/>
        </>
    )
}
export default Aide;