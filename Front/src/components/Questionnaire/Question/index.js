import './style.scss';
import Steps from '../../Steps';
import BackChevron from '../../BackChevron';
import { Link } from 'react-router-dom';

function Question({ step, color, color2, title, desc, link, right, prog1, prog2, prog3, prog4, wide }){
    const chevronBack = <BackChevron />
    const rightContainer = right
    return(
        <>
            <section className='question'>
            <Link aria-label='Retour à la page précédente' to={link}>{chevronBack}</Link>
                <div className="question--header">
                    <Steps step={step} prog1={prog1} prog2={prog2} prog3={prog3} prog4={prog4} />
                </div>
                <div className="question--container">
                    <div className='question--container--left'>
                        <h2 className={'question--title ' + wide}><span className="question--color">{color}</span>{title}<span className="question--color">{color2}</span></h2>
                        <p className='question--desc'>{desc}</p>
                    </div>
                    <div className="question--container--right">
                        {rightContainer}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Question;