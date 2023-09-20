import './style.scss';
import Button from '../Button';

function Birthform(){
    const days = Array.from({ length: 31 }, (_, i) => i + 1).map((dayValue) => (
        <option key={dayValue} value={dayValue}>
            {dayValue}
        </option>
    ));

    const months = Array.from({ length: 12 }, (_, i) => i + 1).map((monthValue) => (
        <option key={monthValue} value={monthValue}>
            {monthValue}
        </option>
    ));

    const years = Array.from({ length: 124 }, (_, i) => 2023 - i).map((yearValue) => (
        <option key={yearValue} value={yearValue}>
            {yearValue}
        </option>
    ));

    const btn = <Button name="Suivant" href="/location" style="date--btn" id="btn"/>
    return (
    <>
        <form className='date'>
            <div className="date--container">
                <label htmlFor="days">Jour</label>
                    <select className='date--select' id="days" name="days" value={days}>
                        <option value=""></option>
                        {days}
                    </select>
            </div>

            <div className="date--container">
                <label htmlFor="months">Mois</label>
                    <select className='date--select' id="months" name="months" value={months}>
                        <option value=""></option>
                        {months}
                    </select>
            </div>

            <div className="date--container">
                <label htmlFor="years">Année</label>
                    <select className='date--select' id="years" name="years" value={years}>
                        <option value=""></option>
                        {years}
                    </select>
            </div>
                {btn}
        </form>
    </>
    );
};

export default Birthform;