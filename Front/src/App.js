import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import CardSection from "./components/Cards";
import Categories from "./components/Categories";
import History from "./components/History";
import Reservation from "./components/Reservation";
import Insert from "./components/Insert";
import { useState, useEffect } from "react";

export function App() {
    const [error, setError] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');
        if (error) {
            setErrorFromURL(error);
        }
    }, []);
    return (
        <>
            <Header />
            {error && <p>{error}</p>}
            <Homepage />
            <Categories />
            <Reservation />
            <Insert />
            <CardSection />
            <History />
            <Footer />
        </>
    );
}