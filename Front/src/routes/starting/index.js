import './style.scss';
import welcome from "./img/imageadmin.png"
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Button from '../../components/Button';
import BackChevron from '../../components/BackChevron/index'
import { useAuth } from '../../AuthContext';

function Starting(){
    const btnL = <Button style='btn--skip' link="/client" name='Skip' />
    const btnR = <Button style='btn' link="/questions/birth" name='Suivant' />
    const { user } = useAuth();

    return(
        <>
        <Header/>
        <section className='starting'>
        <BackChevron/>
            <h1 className='color starting__title'>Commençons</h1>

            <div className='starting__column'>
                <img className='starting__column__img' src={welcome} alt="Image de bienvenue" />
                <div className='starting__column__desc'>
                    <h2 className=' starting__column__desc__title'><span className='color'>Bienvenue </span>{ user && user.firstname} !</h2>
                    <p className='starting__column__desc__subtitle'>La prochaine étape est falcutative</p>
                    <p className='starting__column__desc__text'>Nous te proposons un rapide questionnaire (de moins de 2 min), dans le but de nous aider à te proposer nos meilleures pépites.</p>
                    <p className='starting__column__desc__text'>Cette étape est fortement recommandée, mais il est toujours possible de compléter cette étape, plus tard dans la section <span className='conditions'>Profil.</span></p>
                    <div className='starting__column__desc__button conditions'>
                        {btnL}
                        {btnR}
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
        </>
    )
}

export default Starting;