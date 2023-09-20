import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import './style.scss'
import { useAuth } from '../../../AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { differenceInDays } from 'date-fns';
import Cardprop from '../../../components/Cards/cardprop';
import axios from 'axios';

function admin_home(){
    const { user } = useAuth();
    const navigate = useNavigate();

    const urlService = 'http://localhost:3000/prestataire/service';
    const [service, setService] = useState([]);

    const fetchInfoService = () => {
        return fetch(urlService)
          .then((res) => res.json())
          .then((data) => {
            const updatedData = data.map((item) => ({
              ...item,
              remainingDays: differenceInDays(new Date(item.endDate), new Date()),
            }));
      
            const sortedData = updatedData.sort((a, b) => a.remainingDays - b.remainingDays);
            setService(sortedData);
          })
          .catch((error) => console.error('Erreur lors du chargement des utilisateurs:', error));
      };

      
      const fetchService = async () => {
          try {
              const response = await axios.get(urlService);
              setService(response.data);
            } catch (error) {
                console.error('Erreur lors du chargement des utilisateurs:', error);
            }
        };
        
        useEffect(() => {
            fetchInfoService();
          }, []);
    
          
        useEffect(() => {
                fetchService();
            }, []);


            const serviceCard = service.map((user, index) => {
                let textColorClass;
                let remainingDaysText;
              
                if (user.remainingDays < 0) {
                  textColorClass = 'red-text';
                  remainingDaysText = 'Échéance dépassée';
                } else if (user.remainingDays < 15) {
                  textColorClass = 'orange-text';
                  remainingDaysText = `${user.remainingDays}`;
                } else {
                  textColorClass = 'green-text';
                  remainingDaysText = `${user.remainingDays}`;
                }
              
                return (
                  <Cardprop
                    id={user.id}
                    etablissementId={user.etablissementId}
                    key={index}
                    nom={user.name}
                    price={user.price}
                    description={user.description}
                    guest={user.guest}
                    photo={user.image}
                    etablissement={user.etablissements}
                    remainingDays={remainingDaysText}
                    textColorClass={textColorClass}
                  />
                );
              });
    

    useEffect(() => {
        if (!user || user.role !== 'admin'){
            console.error("Accès non autorisé")
            navigate('/auth?error=Acces%20Non%20Autorisé')
        }
    }, [user]);
    return(
        <>
            <Header />
            <section className='admin'>
                <h2 className='admin-title'>Service(s) nécessitant une mise à jour :</h2>
                <div className='admin-card'>
                    <div className='admin-card-content'>
                        {serviceCard}
                    </div>
                </div>
                <h2 className='admin-title'>En tant qu'Administrateur je souhaite :</h2>
                <ul className='admin-list'>
                    <li className='admin-list-item'>
                        <a className='admin-list-item-button' href='/admin/presta/account'>Gérer les comptes prestataires</a>
                    </li>
                    <li className='admin-list-item'>
                        <a className='admin-list-item-button' href='/admin/client/account'>Gérer les comptes clients</a>
                    </li>
                    <li className='admin-list-item'>
                        <a className='admin-list-item-button' href='/admin/create'>Créer un compte prestataire</a>
                    </li>
                    <li className='admin-list-item'>
                        <a className='admin-list-item-button' href='/admin/reservation'>Gérer les réservations</a>
                    </li>
                </ul>
            </section>
            <Footer />
        </>
    )
}


export default admin_home;