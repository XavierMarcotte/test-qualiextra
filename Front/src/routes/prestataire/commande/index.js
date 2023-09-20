import './style.scss';
import BackChevron from '../../../components/BackChevron';
import List from '../../../components/List';
import { useAuth } from '../../../AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Commande() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || (user.role !== 'prestataire' && user.role !== 'admin')){
            console.error("Accès non autorisé")
            navigate('/auth?error=Acces%20Non%20Autorisé')
        }
    }, [user]);
    return(
        <section className="prestacommande">
            <List 
            title='Mes commandes'
            headfirst='Date '
            headsecond='Durée '
            headthird='Adresse '
            headfourth='Mail'
            listfirst='Participants : '
            listsecond='Description du service : '
            listthird='Date de réservation : '
        />
            <BackChevron/>
        </section>
    )
}

export default Commande