import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import React, { useState } from 'react';
import './style.scss';
import './avis.scss';
import crayon from '../../components/Reservation/logos/crayon.png'
import hygiene from './img/hygiene.png'
import personnel from './img/personnel.png'
import etoile from './img/staravis.png'
import gustave from './img/gustave.png'
import paola from './img/paola.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import wa from './img/wa.png'
import Counter from '../counter';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function description({ etablishData, detailData }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [msg, setMsg] = useState('Selectionner une date');
    const [melMsg, setMelMsg] = useState('');
    const [selectedDate, setSelectedDate] = useState([]);
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showAvisSection, setShowAvisSection] = useState(false);
    const [counterValue, setCounterValue] = useState(1);
    const [selectedExtra, setSelectedExtra] = useState([]);

    function handleCounterChange(newValue) {
        setCounterValue(newValue)
    }

    const toggleAvisSection = () => {
        setShowAvisSection(!showAvisSection);
    };


    function dateClick(info) {
        const dateStr = info.dateStr;
        const isDateSelected = selectedDate.includes(dateStr);
        if (isDateSelected) {
            setSelectedDate(selectedDate.filter((date) => date !== dateStr));
            setMsg(info.dateStr)
            info.dayEl.style.backgroundColor = '';
            setIsDateSelected(false);
        } else {
            setSelectedDate([...selectedDate, dateStr]);
            setMsg(info.dateStr)
            info.dayEl.style.backgroundColor = '#DBCD29';
            setIsDateSelected(true);
        }
        setIsFirstLoad(false)
    }

    function handleClick() {
        setShowCalendar(true);
    }

    function handleClose() {
        setShowCalendar(false);
    }

    function handleExtraSelection(extraId){
        if(selectedExtra.includes(extraId)) {
            setSelectedExtra(selectedExtra.filter((id) => id !== extraId))
        } else {
            setSelectedExtra([...selectedExtra, extraId]);
        }
    }

    async function handleCart() {
        try {
            const response = await axios.post(`http://localhost:3000/cart/${user.id}`, {
                user,
                date: selectedDate,
                userId: user.id,
                serviceId,
                tookPlace : counterValue,
                extra: selectedExtra,
            });
            if (response.status === 401){
                setMelMsg(`Vous devez confirmer votre adresse mail avant de pouvoir réserver`)
                console.error(melMsg);
            }
            else if (response.status === 201) {
                navigate('/panier')
            }
        } catch (error) {
            console.error(error);
            setMelMsg(`Vous devez confirmer votre adresse mail avant de pouvoir réserver`);
        }
    }

    const { name: etablishName, image: etablishImg } = etablishData;
    const { id: serviceId, price, name: serviceName, image: serviceImg, description, extras, startDate, endDate } = detailData;
    const formatedStart = startDate.slice(0, 10)
    const formatedEnd = endDate.slice(0, 10)
    const extrasList = extras.map(extra =>
        <div key={extra.nomExtra}>
            <input 
            name={extra.nomExtra} 
            type='checkbox' 
            checked={selectedExtra.includes(extra)} 
            onChange={() => handleExtraSelection(extra)} 
            />
            {extra.nomExtra}
            <p>{extra.prixExtra}&#x20AC;</p>
        </div>
    )

    return (
        <>
            <section className='description'>
                <div className='description-left'>
                    <div className='description-left-first'>
                        <span>Tendance</span>
                        <span>Fun</span>
                        <span>Chic</span>
                    </div>
                    <div className='description-left-second'>
                        <h4>Description</h4>
                        <p className='description-left-second-text'>{description}</p>
                    </div>
                    <div className='description-left-fourth'>
                        <p>points forts</p>
                        <p>commentaires</p>
                        <p>FAQ</p>
                        <button className='description-left-fourth-button'><FontAwesomeIcon onClick={toggleAvisSection} icon={showAvisSection ? faChevronDown : faChevronRight} /></button>
                    </div>
                </div>
                <div className='description-right'>
                    {!isFirstLoad &&
                        (isDateSelected ?
                            <p className='error'>Date sélectionnée : {msg}</p>
                            :
                            <p className='error'>Date déselectionnée : {msg}</p>
                        )
                    }
                    {showCalendar &&
                        <div className='calendar-display'>
                            <FullCalendar
                                plugins={[interactionPlugin, dayGridPlugin]}
                                initialView='dayGridMonth'
                                weekends={true}
                                selectable={true}
                                events={[
                                    {
                                        title: serviceName,
                                        start: formatedStart,
                                        end: formatedEnd,
                                        color: '#001313',
                                        textColor: 'white',
                                    }
                                ]}
                                dateClick={dateClick}
                            />
                        </div>
                    }
                    <p className='description-right-price'>{price}&#x20AC;</p>
                    <div className='description-right-first'>
                        <div className='description-right-first-top'>
                            <div className='description-right-first-top-crayon'>
                                <p onClick={handleClick}>{msg}</p>
                                <img src={crayon}></img>
                            </div>
                            <div className='description-right-first-top-counter'>
                            <Counter value={counterValue} handleCounterChange={handleCounterChange} />
                            </div>
                        </div>
                        <div className='description-right-first-bottom'>
                            <p className='description-right-first-bottom-nuit'>1 nuit</p>
                            <p className='description-right-first-bottom-prix'>{price}&#x20AC;</p>
                        </div>
                    </div>
                    <div className='description-right-second'>
                        <p className='description-right-second-extra'>Ajouter des extras</p>
                        {extrasList}
                    </div>
                    <div className='description-right-third'>
                        {melMsg && <p className='error'>{melMsg}</p>}
                        <a className='description-right-third-link'>
                            <button onClick={handleCart} className='description-right-third-link-reserver'>Réserver</button></a>
                        <a className='description-right-third-reserverpls color'>Réserver à plusieurs</a>
                    </div>
                </div>
            </section>
            {showAvisSection && (
            <section className='avis'>
                <div className='avis-first'>
                    <div>
                        <img src={personnel}></img>
                        <p>Personnel passioné et à l'écoute</p>
                    </div>
                    <div>
                        <img src={hygiene}></img>
                        <p>Renforcement des mesures d'hygiène et de nettoyage</p>
                    </div>
                </div>
                <div className='avis-second'>
                    <div className='avis-second-div'>
                        <div className='avis-second-div-each'>
                            <div className='avis-second-div-each-first'>
                                <img src={etoile}></img>
                                <p>4,3/5</p>
                            </div>
                            <div className='avis-second-div-each-second'>
                                <div>
                                    <p>Service</p>
                                    <input type='range'></input>
                                    <p className='avis-second-div-each-second-note'>4,4</p>
                                </div>
                                <div>
                                    <p>Qualité prix</p>
                                    <input type='range'></input>
                                    <p className='avis-second-div-each-second-note' h>3,9</p>
                                </div>
                            </div>
                            <div className='avis-second-div-each-third'>
                                <div className='avis-second-div-each-third-items'>
                                    <img src={gustave}></img>
                                    <div className='avis-second-div-each-third-items-avis'>
                                        <p>Gustave Berty</p>
                                        <h5>Trop cool!</h5>
                                    </div>
                                    <i className='material-icons  en_ce_moment_rightside_monte_avis avis-second-div-each-third-items-star'><FontAwesomeIcon className='star' icon={faStar} />4 / 5</i>
                                </div>
                                <div className='avis-second-div-each-third-text'>
                                    <p>Le personnel est absolument adorable. <br></br>Le personnel d'accueil est très gentil et a même de gentilles attentions de temps en temps.<br></br> Les cocktails à base de rhum sont très bons.</p>
                                </div>
                            </div>
                        </div>
                        <div className='avis-second-div-each'>
                            <div className='avis-second-div-each-first'>
                                <p>+ 3000 reviews</p>
                            </div>
                            <div className='avis-second-div-each-second'>
                                <div>
                                    <p>Emplacement</p>
                                    <input type='range'></input>
                                    <p className='avis-second-div-each-second-note'>4,4</p>
                                </div>
                                <div>
                                    <p>Hygiène</p>
                                    <input type='range'></input>
                                    <p className='avis-second-div-each-second-note' h>4,9</p>
                                </div>
                            </div>
                            <div className='avis-second-div-each-third'>
                                <div className='avis-second-div-each-third-items'>
                                    <img src={paola}></img>
                                    <div className='avis-second-div-each-third-items-avis'>
                                        <p>Paola Dubranger</p>
                                        <h5>Wow</h5>
                                    </div>
                                    <i className='material-icons  en_ce_moment_rightside_monte_avis avis-second-div-each-third-items-star'><FontAwesomeIcon className='star' icon={faStar} />5 / 5</i>
                                </div>
                                <div className='avis-second-div-each-third-text'>
                                    <p>Le bar, avec ses mille références de rhum, est un atout évident de cet hôtel: parfait pour les cocktails et la qualité du service en soirée. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button>Voir plus</button>
                </div>
                <div className='avis-third'>
                    <div className='avis-third-div'>
                        <h5>faq</h5>
                        <div className='avis-third-div-blue'>
                            <p>Y a-t-il un parking public à proximité ?</p>
                            <img src={wa}></img>
                        </div>
                        <div className='avis-third-div-blue second'>
                            <p>Est-il possible de venir pour l'expérience en venant boire un verre (sans y dormir) ?</p>
                            <img className='rotate' src={wa}></img>
                        </div>
                        <div className='avis-third-div-blue-depli'>
                            <p><span>Oui,</span> vous pouvez allez découvrir les cocktails au bar sans souci. Idem pour le dîner cubain, il est accessible mais vous devez réserver. Le reste de l'expérience en revanche sera réservé uniquement aux résidents de l'hôtel.</p>
                        </div>
                        <button ><a className='avis-third-div-blue-depli-contact' href={`tel:${etablishData.phone}`}>Contacter l'établissement</a></button>
                    </div>
                </div>
            </section>
            )}
        </>
    )
}

export default description;