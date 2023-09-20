import './style.scss';
import Button from '../../Button';
import collegues from './img/collegues.png';
import friends from './img/friends.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function WeekendElt(){
    const selectedBg = "--selected"
    const [selectedWeekend1, setSelectedWeekend1] = useState(false);
    const [selectedWeekend2, setSelectedWeekend2] = useState(false);
    const handleSelectedWeekend1 = () => {
        setSelectedWeekend1(true);
        setSelectedWeekend2(false);
    };
    const handleSelectedWeekend2 = () => {
        setSelectedWeekend2(true);
        setSelectedWeekend1(false);
    };

    const btn = <Button name="Suivant" style="date--btn" id="btn"/>
    return (
    <>
        <form className='weekend'>
                <p className='weekend--title'>Sélectionnez une réponses ci-dessous :</p>
            <div className="weekend--container">
                <div onClick={handleSelectedWeekend1} className={`weekend--card${selectedWeekend1 === true ? selectedBg :''}`}>
                    <img className='weekend--card--img' src={collegues} alt="Image du choix de gauche" />
                    <p className='weekend--card--subtitle'>Une dégustation avec les collègues</p>
                </div>
                <div onClick={handleSelectedWeekend2} className={`weekend--card${selectedWeekend2 === true ? selectedBg :''}`}>
                        <img className='weekend--card--img' src={friends} alt="Image du choix de droite" />
                        <p className='weekend--card--subtitle'>Aller en terrasse entre amis</p>
                    </div>
                </div>
                <div className='favlocs--next weekend--next'>
                        <Link to="/questions/night">{btn}</Link>
                    </div>
        </form>
    </>
    );
};

export default WeekendElt;