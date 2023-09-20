import './style.scss';
import Header from "../../../components/Header";
import Question from "../../../components/Questionnaire/Question";
import Footer from '../../../components/Footer';
import FriendsElt from '../../../components/Questionnaire/FriendsElt';

function Friends(){
    const rightElement = <FriendsElt />
    return(
        <>
            <Header />
            <Question 
            step="Pour terminer" 
            prog1="on-1-static"
            prog2="on-2-static"
            prog3="on-3-static"
            prog4="on-4"
            color="Organise "
            title= "des sorties avec tes proches :"
            desc=""
            link ="/questions/drinks"
            right= {rightElement} 
            wide = "wide" />
            <Footer />
        </>
    )
}

export default Friends;