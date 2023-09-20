import './style.scss';
import Button from '../../Button';
import drinks from './drinks.js'
import { Link } from 'react-router-dom';
import { useState } from 'react';

function DrinksElt(){
    const selectedBg = "--selected"
    const [selectBtn, setSelectedBtn] = useState([]);

    const handleSelectedBtn = (e) => {
        const btnText = e.target.innerText;
        if (selectBtn.includes(btnText)) {
            setSelectedBtn(selectBtn.filter(btn => btn !== btnText));
        } else {
            setSelectedBtn([...selectBtn, btnText]);
        }
    };

    const btn = <Button name="Suivant" style="date--btn" id="btn"/>
    const favBtn = drinks.map(drink =>
        <div onClick={handleSelectedBtn} className={`drink--card${selectBtn.includes(drink.title) ? selectedBg : ''}`}>
            <img key={drink.id} className='drink--card--img' src={drink.url} alt={drink.alt} />
            <p className='drink--card--subtitle'>{drink.title}</p>
        </div>
    )
    return (
    <>
        <form className='drink'>
                <p className='drink--title'>Sélectionnez une ou plusieurs réponses suivantes :</p>
            <div className="drink--container">
                {favBtn}
            </div>
            <div className='favlocs--next weekend--next'>
                <Link to="/questions/friends">{btn}</Link>
            </div>
        </form>
    </>
    );
};

export default DrinksElt;