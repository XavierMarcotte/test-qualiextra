import './style.scss';
import Header from "../../../components/Header";
import Question from "../../../components/Questionnaire/Question";
import Footer from '../../../components/Footer';
import FavlocElt from '../../../components/Questionnaire/FavlocElt';

function Favloc(){
    const rightElement = <FavlocElt />
    return(
        <>
            <Header />
            <Question 
            step="Plus en détails" 
            prog1="on-1-static"
            prog2="on-2"
            color="Lieux "
            title= "de prédilection"
            desc="Dis-nous où tu aimes passer ton temps libre"
            link ="/questions/location"
            right= {rightElement} />
            <Footer />
        </>
    )
}

export default Favloc;