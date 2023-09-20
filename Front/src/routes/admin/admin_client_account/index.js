import List from "../../../components/List";
import { useAuth } from '../../../AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function admin_client_account() {
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
        title='Liste des comptes client'
        headfirst='Prénom '
        headsecond='Nom '
        headthird='E-mail '
        headfourth='Numéro'
        listfirst='Date de création de compte : '
        listsecond='Nombre de réservation : '
        blockwhat='compte client'
        deletewhat='compte client'
      />
    </>
  );
  }
  
  export default admin_client_account;