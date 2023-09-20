import './style.scss';
import joy from './img/joy.png';
import activities from './activities';
import Header from "../../../components/Header";
import Button from '../../../components/Button';
import { Link } from 'react-router-dom';

function Welcome(){
    const favBtn = activities.map(friend =>
        <div className="results--container--card">
            <img key={friend.id} className='results--container--card--img' src={friend.url} alt={friend.alt} />
            <p className='results--container--card--subtitle'>{friend.title}</p>
        </div>
    )
    const btn = <Button name="Suivant" style="results--btn" id="btn"/>
    return(
        <>
        <Header/>
        <section className='results'>
            <img className='results--image' src={joy} alt="Image de joie" />
            <h1 className='results--title'><span className='color'>Super !</span> Voici ce que nous avons trouvé pour toi</h1>
            <div className="results--container">
                {favBtn}
            </div>
            <div className='favlocs--next weekend--next'>
                <Link to="/welcome">{btn}</Link>
            </div>
        </section>
        </>
    )
}
export default Welcome;