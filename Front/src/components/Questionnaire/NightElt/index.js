import './style.scss';
import Button from '../../Button';
import historic from './img/historic.png';
import present from './img/present.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function NightElt(){
    const selectedBg = "--selected"
    const [selectedNight, setSelectedNight] = useState(null);
    const handleSelectedNight = () => {
        setSelectedNight(!selectedNight);
    };
    const [selectedNight2, setSelectedNight2] = useState(null);
    const handleSelectedNight2 = () => {
        setSelectedNight2(!selectedNight2);
    };

    const btn = <Button name="Suivant" style="date--btn" id="btn"/>
    return (
    <>
        <form className='weekend'>
                <p className='weekend--title'>Sélectionnez une ou plusieurs réponses :</p>
            <div className="weekend--container">
                <div onClick={handleSelectedNight}
                        className={`weekend--card${selectedNight ? selectedBg : ""}`}>
                    <img className='weekend--card--img' src={historic} alt="Image du choix de gauche" />
                    <p className='weekend--card--subtitle'>Un lieu historique</p>
                </div>
                <div onClick={handleSelectedNight2}
                        className={`weekend--card${selectedNight2 ? selectedBg : ""}`}>
                        <img className='weekend--card--img' src={present} alt="Image du choix de droite" />
                        <p className='weekend--card--subtitle'>Un lieu contemporain</p>
                    </div>
                </div>
                <div className='favlocs--next weekend--next'>
                    <Link to="/questions/date">{btn}</Link>
                </div>
        </form>
    </>
    );
};

export default NightElt;