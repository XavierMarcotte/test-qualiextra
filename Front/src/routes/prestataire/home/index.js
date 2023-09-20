import Header from "../../../components/Header";
import Footer from '../../../components/Footer';
import Homeprestapage from "../../../components/Presta_home";
import { useAuth } from '../../../AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Prestataire(){
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || (user.role !== 'prestataire' && user.role !== 'admin')){
            console.error("Accès non autorisé")
            navigate('/auth?error=Acces%20Non%20Autorisé')
        }
    }, [user]);
    return(
        <>
            <Header />
            <Homeprestapage />
            <Footer />
        </>
    )
}

export default Prestataire;