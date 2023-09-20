import './style.scss';
import Button from '../../Button';
import Friends from './friends.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function FriendsElt(){
    const [isButtonClicked, setFriends] = useState(false);
    const handleClick = (i) => {
        const updateFriends = [...Friends];
        updateFriends[i].isClicked = !updateFriends[i].isClicked;
        setFriends(updateFriends);
    };

    const btn = <Button name="Terminer" style="friends-btn" id="btn"/>
    const favBtn = Friends.map((friend, i) =>
        <div className="friends--card">
            <img key={friend.id} className='friends--card--img' src={friend.url} alt="" />
            <p className='friends--card--subtitle'>{friend.title}</p>
            <a onClick={() => handleClick(i)} className='cross'><FontAwesomeIcon icon={friend.isClicked ? faCheck : faPlus} /></a>
        </div>
    )
    return (
    <>
        <form className='friends'>
                <input aria-label='Rechercher un ami' className='friends--search' type="search" name="" id="" placeholder='Rechercher manuellement' />
                <p className='friends--title'>Suggestions :</p>
            <div className="friends--container">
                {favBtn}
            </div>
            <div className='favlocs--next weekend--next'>
                <Link to="/questions/results">{btn}</Link>
            </div>
        </form>
    </>
    );
};

export default FriendsElt;