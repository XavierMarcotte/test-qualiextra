import './style.scss';
import ideas from "./img/ideas.png";
import karaoke from "./img/karaoke.png";
import time from "./img/time.png";


const inserts = [
    {id: 1, title: 'Gagner du temps', img: time, alt: 'Logo Gagner du temps'},
    {id: 2, title: 'Donner de l\'inspiration', img: ideas, alt: 'Logo Donner de l\'ins piration'},
    {id: 3, title: 'Vivre des expériences de qualité sans voyager', img: karaoke, alt: 'Logo Vivre des expériences de qualité sans voyager'},
];

function Insert(){
    const insertList = inserts.map(insert =>
        <li className='insert--list' key={insert.id}>
            <img className='insert--logo' src={insert.img} alt={insert.alt} />
            {insert.title}
        </li>
        )
    return(
        <section>
            <ul className='insert'>{insertList}</ul>
        </section>
    );
}

export default Insert;