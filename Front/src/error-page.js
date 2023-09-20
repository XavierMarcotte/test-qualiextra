import { useRouteError } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <>
            <Header />
            <div id="error-page">
                <h1>Oups!</h1>
                <p>Désolé, une erreur inattendue s'est produite</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
            <Footer />
        </>
    );
}