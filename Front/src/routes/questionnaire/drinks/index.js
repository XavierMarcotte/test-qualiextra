import './style.scss';
import Header from "../../../components/Header";
import Question from "../../../components/Questionnaire/Question";
import Footer from '../../../components/Footer';
import DrinksElt from '../../../components/Questionnaire/DrinksElt';

function Drinks(){
    const rightElement = <DrinksElt />
    return(
        <>
            <Header />
            <Question 
            step="Tes préfèrences" 
            prog1="on-1-static"
            prog2="on-2-static"
            prog3="on-3-static"
            color="Si tu étais "
            title= "une boisson, tu serais plutôt..."
            desc=""
            link ="/questions/date"
            right= {rightElement} 
            wide = "wide" />
            <Footer />
        </>
    )
}

export default Drinks;