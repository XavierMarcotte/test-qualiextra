import imagewelcome from '../../welcome/img/imagewelcome.png';
import Header from '../../../components/Header';
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Admin_init(){
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
        navigate(0);
        navigate('/admin/home')
    }, 0)
    }, [])
    return(
        <>
        <Header/>
        <section className='container'>
        <img className='container--image' src={imagewelcome} alt="Image de bienvenue" />
        <h1 className='container--title'>Initialisation de l'administration </h1>
        <div class="progress"></div>
        <p className='container--desc'>Veuillez patienter</p>
        </section>
        </>
    )
}
export default Admin_init;