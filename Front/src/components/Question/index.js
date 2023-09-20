import './style.scss';
import Steps from '../Steps';
import Birthform from '../Birthform';

function Question({ step, title, desc }){
    return(
        <>
            <section className='question'>
                <div className="question--header">
                    <Steps step='Dis nous en plus' />
                </div>
                <div className='question--container'>
                    <div className='question--container--left'>
                        <h2 className='question--title'>{title}</h2>
                        <p className='question--desc'>{desc}</p>
                    </div>
                    <div className="question--container--right">
                        <Birthform />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Question;