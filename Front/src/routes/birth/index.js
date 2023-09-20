import './style.scss';
import Header from "../../components/Header";
import Question from "../../components/Question";
import Footer from '../../components/Footer';

function Birth(){
    return(
        <>
            <Header />
            <Question 
            step="Dis nous en plus" 
            title= "Date de naissance"
            desc="Parce qu'on ne sait jamais où fêter son anniversaire" />
            <Footer />
        </>
    )
}

export default Birth;