import './style.scss';
import BackChevron from '../../BackChevron';

function AccountElt(){
    return (
        <section className='admin'>
            <BackChevron/>
            <h2 className='admin-title'>Mon compte client</h2>
            <ul className='admin-list'> 
                <li className='admin-list-item'>
                    <a className='admin-list-item-button admin-list-item-button-client' href='/client/account/informations'>Informations du compte</a>
                </li>
                <li className='admin-list-item'>
                    <a className='admin-list-item-button admin-list-item-button-client' href='/client/favorites'>Voir mes services favoris</a>
                </li>
                <li className='admin-list-item'>
                    <a className='admin-list-item-button admin-list-item-button-client' href='/client/my-reservations'>Voir mes réservations</a>
                </li>
            </ul>
        </section>
    );
};

export default AccountElt;