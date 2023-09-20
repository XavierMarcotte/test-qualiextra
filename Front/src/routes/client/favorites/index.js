import './style.scss';
import Header from "../../../components/Header";
import Footer from '../../../components/Footer';
import FavoritesElt from '../../../components/Client/FavoritesElt';

function Favorites(){
    return(
        <>
            <Header />
            <FavoritesElt />
            <Footer />
        </>
    )
}

export default Favorites;