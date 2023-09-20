import './style.scss';
import Header from '../../../components/Header';
import BackChevron from '../../../components/BackChevron';
import Footer from '../../../components/Footer';
function Confidentialité(){
    return(
        <>
        <Header/>
        <section className='confidentialité'>
            <BackChevron/>
            <h1 className='confidentialité--title'>Politique de  <span className='color'>confidentialité</span></h1>
            <p className='confidentialité--desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </section>
        <Footer/>
        </>
    )
}
export default Confidentialité;