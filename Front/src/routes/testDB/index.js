import { useState, useEffect } from "react";
import './style.scss';

function Test() {
    const urlEtablissement = "http://localhost:3000/etablissement"
    const [etablissement, setEtablissement] = useState([]);

    const fetchInfoEtablissement = () => {
        return fetch(urlEtablissement).then((res) => res.json()).then((d) => setEtablissement(d))
    }

    useEffect(() => {
        fetchInfoEtablissement();
    }, []);

    return (
        <h1>{etablissement.map((dataObj, index) => {
            return (
                <div className="container">
                    <p className="test-de-name">{dataObj.name}
                    <p className="test-de-adresse">{dataObj.address}</p>
                    <span className="test-de-adresse">Prix moyen : {dataObj.avg_price}€</span>
                    </p>
                </div>
            )
        })}</h1>
    )
}
export default Test;