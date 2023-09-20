import './style.scss';
import Header from "../../../components/Header";
import Question from "../../../components/Questionnaire/Question";
import Footer from '../../../components/Footer';
import DateElt from '../../../components/Questionnaire/DateElt';

function Date(){
    const rightElement = <DateElt />
    return(
        <>
            <Header />
            <Question 
            step="Tes préférences" 
            prog1="on-1-static"
            prog2="on-2-static"
            prog3="on-3-static"
            title= "A quoi ressemble ton"
            color2=" date parfait"
            desc=""
            link ="/questions/night"
            right= {rightElement}
            wide="wide" />
            <Footer />
        </>
    )
}

export default Date;