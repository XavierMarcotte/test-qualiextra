import './style.scss';
import Button from '../../Button';
import dates from "./Dates.js";
import { Link } from 'react-router-dom';
import { useState } from 'react';

function DateElt(){
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
    const favBtn = dates.map(favloc =>
            <button
            onClick={handleSelectedBtn}
            type='button' 
            className={`favloc--btn${selectBtn.includes(favloc.title) ? selectedBg : ''} stars--btn`}
            key={favloc.id}>{favloc.title}
            </button>
        )
    return (
    <>
        <form className='dates'>
            <div className="dates--container">
                <p className='dates--title'>Sélectionnez une ou plusieurs réponses suivantes :</p>
                <div className="dates--btns stars--btns">
                    {favBtn}
                </div>
            </div>
            <div className='favlocs--next weekend--next'>
                <Link to="/questions/drinks">{btn}</Link>
            </div>
        </form>
    </>
    );
};

export default DateElt;