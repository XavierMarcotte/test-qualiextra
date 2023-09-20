import './style.scss';
import Header from "../../../components/Header";
import Question from "../../../components/Questionnaire/Question";
import Footer from '../../../components/Footer';
import Birthform from '../../../components/Questionnaire/Birthform';

function Birth(){
    const rightElement = <Birthform />
    return(
        <>
            <Header />
            <Question 
            step="Dis nous en plus" 
            prog1="on-1"
            color="Date "
            title= "de naissance"
            desc="Parce qu'on ne sait jamais où fêter son anniversaire"
            link= "/auth"
            right= {rightElement}
            />
            <Footer />
        </>
    )
}

export default Birth;