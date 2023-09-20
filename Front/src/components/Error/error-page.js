import { useRouteError } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import BackChevron from "../BackChevron"
import './style.scss'
export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
            <>
            <Header/>
            <section className='error-page'>
                <BackChevron/>
                <h1 className='error-page--title'>Oups !</h1>
            <p className='error-page--desc'><p>Désolé, une erreur inattendue s'est produite</p></p>
            </section>
            <Footer/>
            </>
    );
}