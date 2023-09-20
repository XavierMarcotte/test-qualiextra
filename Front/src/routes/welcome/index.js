import './style.scss';
import imagewelcome from './img/imagewelcome.png';
import Header from '../../components/Header';
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../AuthContext';
function Welcome(){
    const navigate = useNavigate()
    const { user } = useAuth();
    useEffect(() => {
        setTimeout(() => {
        navigate('/client')
        }, 4000)
    }, [])
    return(
        <>
        <Header/>
        <section className='welcome'>
        <img className='welcome--image' src={imagewelcome} alt="Image de bienvenue" />
        <h1 className='welcome--title'>Bienvenue <span className='color'>{user.firstname}</span> !</h1>
        <div class="progress"></div>
        <p className='welcome--desc'>Patientons ensemble quelques instants, nous préparons ton <span className='bold'>Espace personnalisé </span>!</p>
        </section>
        </>
    )
}
export default Welcome;