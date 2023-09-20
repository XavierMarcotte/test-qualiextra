import './style.scss';
import React, { useEffect } from "react";


function Counter({ value, handleCounterChange }) {
    const handleIncrement = () => {
        handleCounterChange(value + 1);
    };

    const handleDecrement = () => {
        if (value > 0) {
            handleCounterChange(value - 1);
        }};


        useEffect(() => {
            const currentURL = window.location.href;
            const btnElements = document.querySelectorAll('.panier--container--desc--reservation--container--participants--btn');
            const count = document.getElementById('count');
            
            if (currentURL.includes('/panier') || currentURL.includes('/details/')) {
                count.classList.add('darkcount');
                btnElements.forEach((button) => {
                    button.classList.add('darkcount');
                });
            } else {
                count.classList.remove('darkcount');
                btnElements.forEach((button) => {
                    button.classList.remove('darkcount');
                });
            }
        }, []);

    return(<>
            <p className='panier--container--desc--info--text--participant color'>Participants</p>
            <div className='panier--container--desc--reservation--container--participants' id='count'>
            <p className="counter panier--container--desc--info--text--participant" id="counter" name="result">
                {value}
            </p>
            <button className="panier--container--desc--reservation--container--participants--btn" onClick={handleDecrement}>
                -
            </button>
            <button className="panier--container--desc--reservation--container--participants--btn" onClick={handleIncrement}>
                +
            </button>
            </div>
</>
)}

export default Counter