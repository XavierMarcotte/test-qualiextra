import './style.scss';
import BackChevron from '../BackChevron';

function Steps({ step, prog1, prog2, prog3, prog4 }){
    return(
        <>
            <h1 className='step'>{step}</h1>
            <div className="bar">
                <div className={"bar--progress--"+prog1}></div>
                <p className="bar--number bar--number_1">1</p>
                <div className={"bar--progress--"+prog2}></div>
                <p className="bar--number bar--number_2">2</p>
                <div className={"bar--progress--"+prog3}></div>
                <p className="bar--number bar--number_3">3</p>
                <div className={"bar--progress--"+prog4}></div>
            </div>
        </>
    )
}

export default Steps;