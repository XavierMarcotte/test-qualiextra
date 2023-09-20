import './style.scss';
import favorites from './favorites.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import BackChevron from '../../BackChevron';

function FavoritesElt(){
    const favBtn = favorites.map(favorite =>
            <div className='client--favorites--container--card'>
                <span className='client--favorites--container--card--heart'><FontAwesomeIcon icon={faHeart} /></span>
                <img key={favorite.id} className='client--favorites--container--card--img' src={favorite.url} alt={favorite.alt} />
                <div className='client--favorites--container--card--details'>
                    <div className='client--favorites--container--card--details--left'>
                        <p className='client--favorites--container--card--details--left--title'>{favorite.title}</p>
                        <p className='client--favorites--container--card--details--left--localisation'>{favorite.localisation}</p>
                        <p className='client--favorites--container--card--details--left--price'>{favorite.price}€</p>
                    </div>
                    <div className='client--favorites--container--card--details--right'>
                        <p className='client--favorites--container--card--details--right--number'><span className='client--favorites--container--card--details--right--star'>&#9733;</span>{favorite.rate}</p>
                        <button className='client--favorites--container--card--details--right--button'>Voir</button>
                    </div>
                </div>
            </div>
    )
    return (
        <section className="client--favorites">
            <h1 className="client--favorites--title">Mes services favoris</h1>
            <BackChevron/>
            <div className='client--favorites--container'>
                {favBtn}
            </div>
        </section>
    );
};

export default FavoritesElt;