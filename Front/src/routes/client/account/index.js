import './style.scss';
import Header from "../../../components/Header";
import Footer from '../../../components/Footer';
import AccountElt from '../../../components/Client/AccountElt';

function Account(){

    return(
        <>
            <Header />
            <AccountElt />
            <Footer />
        </>
    )
}

export default Account;