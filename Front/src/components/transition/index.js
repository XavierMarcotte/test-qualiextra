import './style.scss';
import imagewelcome from './img/imagewelcome.png';
import Header from '../../components/Header';
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Transition(){
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
        navigate('/')
        }, 4000)
    }, [])
    return(
        <>
        <Header/>
        <section className='transition'>
        <img className='transition--image' src={imagewelcome} alt="Image de bienvenue" />
        <h1 className='transition--title'>Adresse  <span className='color'>e-mail</span> confirmée </h1>
        <div class="progress"></div>
        <p className='transition--desc'> <span className='bold'>Redirection</span> en cours!</p>
        </section>
        </>
    )
}
export default Transition;