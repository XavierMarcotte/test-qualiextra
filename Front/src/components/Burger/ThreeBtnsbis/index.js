import './style.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faHeart, faBell, faArrowRightFromBracket, faRightFromBracket, faCartShopping, faCartArrowDown as faCartShoppingEmpty } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartEmpty, faCircleUser as faCircleUserEmpty, faBell as faBellEmpty } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { useAuth } from '../../../AuthContext';

function ThreeBtns(){
    const { user } = useAuth();

    const notifications = [
        'Notification 1',
        'Notification 2',
        'Notification 3',
        'Notification 4',
        'Notification 5',
        'Notification 6',
        'Notification 7',
        'Notification 8',
        'Notification 9',
        'Notification 10',
        'Notification 11',
        'Notification 12',
        'Notification 13',
        'Notification 14',
        'Notification 15',
    ];

    const [isNotifVisible, setIsNotifVisible] = useState(false);
    const [isHoverBell, setIsHoverBell] = useState(false);
    const [isHoverHeart, setIsHoverHeart] = useState(false);
    const [isHoverUser, setIsHoverUser] = useState(false);
    const [isHoverCart, setIsHoverCart] = useState(false);
    const [isHoverLogout, setIsHoverLogout] = useState(false);


    const handleClick = (e) => {
        e.preventDefault();
        setIsNotifVisible(!isNotifVisible);
    }

    const handleBellOver = () => {
        setIsHoverBell(true);
    }

    const handleBellOut = () => {
        setIsHoverBell(false);
    }

    const handleHeartOver = () => {
        setIsHoverHeart(true);
    }

    const handleHeartOut = () => {
        setIsHoverHeart(false);
    }
    const handleUserOver = () => {
        setIsHoverUser(true);
    }

    const handleUserOut = () => {
        setIsHoverUser(false);
    }

    const handleCartOver = () => {
        setIsHoverCart(true);
    }

    const handleCartOut = () => {
        setIsHoverCart(false);
    }

    const handleLogoutOver = () => {
        setIsHoverLogout(true);
    }

    const handleLogoutOut = () => {
        setIsHoverLogout(false);
    }

    const { handleLogout } = useAuth();
    return(
        <>
        <ul className='burger--client--header'>
            {user.role === 'prestataire' && 
                <li className='client--header--li'><a className='client--header--li--reservation' href="/prestataire">Mes établissements</a></li>
                }
            {user.role === 'client' &&
            <>
                <li className='client--header--li'><a className='client--header--li--reservation' href="/client/my-reservations">Mes réservations</a></li>
                <li className='client--header--li'><a onMouseOut={handleBellOut} onMouseOver={handleBellOver} onClick={handleClick} className='client--header--li--btn' href=""><FontAwesomeIcon icon={isHoverBell ? faBell : faBellEmpty} /></a></li>
                <li className='client--header--li'><a onMouseOut={handleHeartOut} onMouseOver={handleHeartOver} className='client--header--li--btn' href="/client/favorites"><FontAwesomeIcon icon={isHoverHeart ? faHeart : faHeartEmpty} /></a></li>
                <li className='client--header--li'><a onMouseOut={handleUserOut} onMouseOver={handleUserOver} className='client--header--li--btn' href="/client/account"><FontAwesomeIcon icon={isHoverUser ? faCircleUser : faCircleUserEmpty } /></a></li>
                <li className='client--header--li'><a onMouseOut={handleCartOut} onMouseOver={handleCartOver} className='client--header--li--btn' href="/panier"><FontAwesomeIcon icon={isHoverCart ? faCartShoppingEmpty : faCartShopping } /></a></li>
            </>
            }
            {user.role === 'admin' &&
                <li className='client--header--li'><a className='client--header--li--reservation' href="/admin/home">Panneau d'administration</a></li>
            }

            <li className='client--header--li'><a onMouseOut={handleLogoutOut} onMouseOver={handleLogoutOver} onClick={handleLogout} className='client--header--li--btn'><FontAwesomeIcon icon={isHoverLogout ? faRightFromBracket : faArrowRightFromBracket }  /></a></li>
        </ul>

            {isNotifVisible && 
            <ul className='notif-div'>
                {notifications.map((notification, index) => (
                    <li className='notif-div-li' key={index}>{notification}</li>
                ))}
            </ul>}
        </>
    )
}

export default ThreeBtns;