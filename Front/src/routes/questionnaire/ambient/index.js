import './style.scss';
import Header from "../../../components/Header";
import Question from "../../../components/Questionnaire/Question";
import Footer from '../../../components/Footer';
import AmbientElt from '../../../components/Questionnaire/AmbientElt';

function Ambient(){
    const rightElement = <AmbientElt />
    return(
        <>
            <Header />
            <Question 
            step="Plus en détails" 
            prog1="on-1-static"
            prog2="on-2-static"
            color="Style "
            title= "de prédilection"
            desc="Dis-nous le type d'ambiance que tu apprécies"
            link ="/questions/favlocs"
            right= {rightElement} />
            <Footer />
        </>
    )
}

export default Ambient;