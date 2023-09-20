import './style.scss';
import logo from "./img/logo_QE.png"
import Button from "../Button";
import ThreeBtns from "../ThreeBtns";
import Burger from '../Burger';
import { useAuth } from '../../AuthContext';

function Header(){
    const { user, handleLogout } = useAuth();
    const userLoggedIn = !user;
    const btn = userLoggedIn ? ( 
    <Button name="Se connecter / S'inscrire" link= "/auth" style="header--btn" /> )
    : ( 
    <>
    <ThreeBtns />
    <Burger/>
    </>
    )
    return(
        <header className="header">
            <a className='header--link' href="/">
                <img className='header--logo' src={logo} alt="Logo QualiExtra" />
            </a>
            {btn}
        </header>
    )
}

export default Header;