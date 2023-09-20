import './style.scss';
import Button from '../../Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Birthform(){
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

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

    const btn = <Button name="Suivant" style="date-btn" id="btn"/>
    return (
    <>
        <form className='date'>
            <div className="date--container">
                <label htmlFor="days">Jour</label>
                    <select className='date--select' id="days" name="days" value={selectedDay} onChange={handleDayChange}>
                        <option value=""></option>
                        {days}
                    </select>
            </div>

            <div className="date--container">
                <label htmlFor="months">Mois</label>
                    <select className='date--select' id="months" name="months" value={selectedMonth} onChange={handleMonthChange}>
                        <option value=""></option>
                        {months}
                    </select>
            <Link to='/questions/location'>{btn}</Link>
            </div>

            <div className="date--container">
                <label htmlFor="years">Année</label>
                    <select className='date--select' id="years" name="years" value={selectedYear} onChange={handleYearChange}>
                        <option value=""></option>
                        {years}
                    </select>
            </div>
        </form>
    </>
    );
};

export default Birthform;