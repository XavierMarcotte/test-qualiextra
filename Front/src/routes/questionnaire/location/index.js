import './style.scss';
import Header from "../../../components/Header";
import Question from "../../../components/Questionnaire/Question";
import Footer from '../../../components/Footer';
import LocationSelect from '../../../components/Questionnaire/LocationSelect';

function Location(){
    const rightElement = <LocationSelect />
    return(
        <>
            <Header />
            <Question 
            step="Dis nous en plus" 
            prog1="on-1-static"
            color= "Localisation"
            desc="Parce qu'on ne veut pas t'emmener au bout du monde"
            link ="/questions/birth"
            right= {rightElement} />
            <Footer />
        </>
    )
}

export default Location;