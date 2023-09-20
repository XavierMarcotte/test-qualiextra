import { useEffect, useState } from "react";
import Cardprop from "../Cards/cardprop";
import './style.scss'

export function shuffleArray(array) {
    let tempArray = [...array];
    for (let i = tempArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
    }
    return tempArray;
}

function faireavec() {
    const [service, setService] = useState([]);

    const fetchInfoService = () => {
        return fetch('http://localhost:3000/prestataire/service')
            .then((res) => res.json())
            .then((data) => setService(data))
            .catch((error) => console.error('Erreur lors du chargement des utilisateurs:', error));
    };
    useEffect(() => {
        fetchInfoService();
    }, []);



    const selectedServices = shuffleArray(service).slice(0, 3);

    const serviceCard = selectedServices.map((user, index) => {
        return (
            <Cardprop
                id={user.id}
                etablissementId={user.etablissementId}
                key={index}
                nom={user.name}
                photo={user.image}
                etablissement={user.etablissements}
            />
        )
    });
    return (
        <section className="afaire">
            <h3 className="avec">à faire <span>avec</span></h3>
            <div className="afaireavec">
                {serviceCard}
            </div>
        </section>
    )
}


export default faireavec;