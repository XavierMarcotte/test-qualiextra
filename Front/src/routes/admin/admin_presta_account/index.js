import List from "../../../components/List";
import { useAuth } from '../../../AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function admin_presta_account() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'admin'){
            console.error("Unauthorized access")
            navigate('/auth')
        }
    }, [user]);
    
    return (
      <>
        <List 
          title='Liste des comptes prestataires'
          headfirst='Prénom '
          headsecond='Nom '
          headthird='Adresse Siège social '
          headfourth='E-mail'
          listfirst='Numéro de téléphone: '
          listsecond='Nombre de réservation : '
          listthird='Nombre établissements : '
          listfourth='Total de service : '
          blockwhat='le compte'
          deletewhat='le compte'
        />
      </>
    );
  }
  
  export default admin_presta_account;