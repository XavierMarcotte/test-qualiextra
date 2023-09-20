import './style.scss';
import Button from '../../Button';
import favlocs from "./Favlocs.js";
import { Link } from 'react-router-dom';
import { useState } from 'react';

function FavlocElt(){
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
    const favBtn = favlocs.map(favloc =>
            <button
            onClick={handleSelectedBtn}
            type='button'
            className={`favloc--btn${selectBtn.includes(favloc.title) ? selectedBg : ''}`}
            key={favloc.id}
            >{favloc.title}</button>
        )
    return (
    <>
        <form className='favloc'>
            <div className="favloc--container">
                <p className='favloc--title'>Sélectionnez une ou plusieurs réponses suivantes :</p>
                <div className="favloc--btns">
                    {favBtn}
                </div>
                <div className='favloc--next'>
                    <Link to="/questions/ambient">{btn}</Link>
                </div>
            </div>
        </form>
    </>
    );
};

export default FavlocElt;