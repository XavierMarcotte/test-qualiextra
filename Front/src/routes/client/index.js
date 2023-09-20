import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Homepage from "../../components/Homepage";
import CardSection from "../../components/Cards";
import Categories from "../../components/Categories";
import History from "../../components/History";
import Reservation from "../../components/Reservation";
import Insert from "../../components/Insert";
import ThreeBtns from "../../components/ThreeBtns";

function Client() {
    const btn = <ThreeBtns />
    return (
        <>
            <Header btn={btn} />
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

export default Client;