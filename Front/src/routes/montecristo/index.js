import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Searchbar from '../../components/Searchbar';
import Description from '../../components/Description';
import Categories from '../../components/Categories';
import Insert from '../../components/Insert';
import Faireavec from '../../components/faireavec';
import Montedescription from '../../components/Montecristo_descri';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function monte(){
    const { id, etablissementId } = useParams();
    const [detailData, setDetailData] = useState(null);
    const [etablishData, setEtablishData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await fetch(`http://localhost:3000/prestataire/service/${id}`);
            if (!response.ok){
                throw new Error(`Erreur HTTP! status: ${response.status}`);
            }
            const data = await response.json();
            setDetailData(data);
        } catch(error){
            console.error(error)
        }
    }
        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await fetch(`http://localhost:3000/prestataire/etablissement/${etablissementId}`);
            if (!response.ok){
                throw new Error(`Erreur HTTP! status: ${response.status}`);
            }
            const data = await response.json();
            setEtablishData(data);
        } catch(error){
            console.error(error)
        }
    }
        fetchData();
    }, [etablissementId]);

    if (!etablishData || !detailData) {
        return 'Loading...'
    }

    return(
        <>
            <Header />
            <Searchbar />
            <Categories />
            <Montedescription etablishData={ etablishData } detailData={ detailData } />
            <Description etablishData={ etablishData } detailData={ detailData }/>
            <Faireavec />
            <Insert />
            <Footer />
        </>
    )
    }
export default monte;