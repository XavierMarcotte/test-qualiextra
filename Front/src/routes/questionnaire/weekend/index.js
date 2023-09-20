import './style.scss';
import Header from "../../../components/Header";
import Question from "../../../components/Questionnaire/Question";
import Footer from '../../../components/Footer';
import WeekendElt from '../../../components/Questionnaire/WeekendElt';

function Weekend(){
    const rightElement = <WeekendElt />
    return(
        <>
            <Header />
            <Question 
            step="Tes préfèrences" 
            prog1="on-1-static"
            prog2="on-2-static"
            prog3="on-3"
            color="Tu préfères "
            title= "pour un samedi soir..."
            desc="Il est préférable de passer ces instants avec un bon entourage (ou pas)"
            link ="/questions/companionship"
            right= {rightElement} 
            wide = "wide" />
            <Footer />
        </>
    )
}

export default Weekend;