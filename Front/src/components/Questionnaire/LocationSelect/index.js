import './style.scss';
import Button from '../../Button';
import { Link } from 'react-router-dom';

function LocationSelect(){

    const btn = <Button name="Suivant" style="date--btn" id="btn"/>
    return (
    <>
        <form className='location'>
            <div className="location--container">
                    <input aria-label='Partager sa localisation' className='location--select' type="search" id="share" name="share" value="Partagez la localisation" placeholder='Partagez la localisation' />
                    <input aria-label='Rechercher manuellement sa localisation' className='location--search' type="search" name="" id="" placeholder='Rechercher manuellement' />
            <Link to="/questions/favlocs">{btn}</Link>
            </div>
        </form>
    </>
    );
};

export default LocationSelect;