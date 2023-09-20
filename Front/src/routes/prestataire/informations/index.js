import Header from '../../../../src/components/Header';
import Footer from '../../../../src/components/Footer';
import { useAuth } from '../../../AuthContext';
import BackChevron from '../../../components/BackChevron';
import './style.scss';

function prestaInformations(){
    const { user } = useAuth();
    return(
        <>
            <Header />
            <section className="account-info">
            <BackChevron />
                <h1 className="account-info__title">Mes informations</h1>
                <div className="account-info__container">
                    <div className="account-info__item">
                        <span className="account-info__label">Nom :</span>
                        <span className="account-info__value">{user.lastname}</span>
                    </div>
                    <div className="account-info__item">
                        <span className="account-info__label">Prénom :</span>
                        <span className="account-info__value">{user.firstname}</span>
                    </div>
                    <div className="account-info__item">
                        <span className="account-info__label">Email :</span>
                        <span className="account-info__value">{user.mail}</span>
                    </div>
                    <div className="account-info__item">
                        <span className="account-info__label">Adresse :</span>
                        <span className="account-info__value">{user.address}</span>
                    </div>
                    <div className="account-info__item">
                        <span className="account-info__label">Numéro :</span>
                        <span className="account-info__value">{user.number}</span>
                    </div>
                    <div className="account-info__item">
                        <span className="account-info__label">Rôle :</span>
                        <span className="account-info__value">{user.role}</span>
                    </div>
                </div>
                    <button className='account-info__button myinfos'><a href='/prestataire/informations/change'>Modifier mes informations</a></button>
            </section>
            <Footer />
        </>
    )
}


export default prestaInformations;