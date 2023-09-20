import './style.scss';
import Header from "../../../components/Header";
import Question from "../../../components/Questionnaire/Question";
import Footer from '../../../components/Footer';
import NightElt from '../../../components/Questionnaire/NightElt';

function Night(){
    const rightElement = <NightElt />
    return(
        <>
            <Header />
            <Question 
            step="Tes préfèrences" 
            prog1="on-1-static"
            prog2="on-2-static"
            prog3="on-3-static"
            color="Tu préfères "
            title= "passer une nuit dans..."
            desc=""
            link ="/questions/weekend"
            right= {rightElement} 
            wide = "wide" />
            <Footer />
        </>
    )
}

export default Night;