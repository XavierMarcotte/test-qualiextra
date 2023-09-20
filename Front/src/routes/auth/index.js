import './style.scss';
import Header from "../../components/Header";
import Login from '../../components/Login';
import Footer from '../../components/Footer';

function Auth(){
    return(
        <>
            <Header />
            <Login />
            <Footer />
        </>
    )
}

export default Auth;