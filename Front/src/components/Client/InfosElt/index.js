import './style.scss';
import React from 'react';
import { useAuth } from '../../../AuthContext';
import BackChevron from '../../BackChevron';

function AccountElt(){
    const { user } = useAuth();
    return (
        <section className="account-info">
            <h1 className="account-info__title">Mes informations</h1>
            <BackChevron/>
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
                    <span className="account-info__label">Téléphone :</span>
                    <span className="account-info__value">{user.phone}</span>
                </div>
                <div className="account-info__item">
                    <span className="account-info__label">Statut du compte :</span>
                    {user.confirmed && <span className="account-info__value">Mail validé</span>}
                    {!user.confirmed && <span className="account-info__value">Veuillez confirmer votre E-mail</span>}
                </div>
            </div>
                <button className='account-info__button'><a href='/client/account/informations/update'>Modifier mes informations</a></button>
        </section>
    );
}

export default AccountElt;