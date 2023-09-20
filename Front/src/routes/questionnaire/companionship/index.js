import './style.scss';
import Header from "../../../components/Header";
import Question from "../../../components/Questionnaire/Question";
import Footer from '../../../components/Footer';
import CompanionElt from '../../../components/Questionnaire/CompanionElt';

function Companion(){
    const rightElement = <CompanionElt />
    return(
        <>
            <Header />
            <Question 
            step="Plus en détails" 
            prog1="on-1-static"
            prog2="on-2-static"
            color="Une Compagnie "
            title= "de qualité"
            desc="Il est préférable de passer ces instants avec un bon entourage (ou pas)"
            link ="/questions/ambient"
            right= {rightElement}
            wide="wide" />
            <Footer />
        </>
    )
}

export default Companion;