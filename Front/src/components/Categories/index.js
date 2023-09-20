import './style.scss';
import { useState } from "react";
import slugify from "slugify";
import categories from './datas.js';

function Categories(){
    const [isHovered, setIsHovered] = useState(null);

    const handleMouseOver = (itemId) => {
        setIsHovered(itemId);
    };

    const handleMouseOut = () => {
        setIsHovered(null);
    };

    
    function handleClick(title) {
        const slug = slugify(title, { lower: true })
        window.location.href = `http://localhost:1234/search?tags=${slug}`;
    }

    const categoriesList = categories.map(categorie => {
        const slug = slugify(categorie.title, {lower: true});
        const isSelected = window.location.href.includes(`tags=${slug}`);

        return (
                <li 
                onMouseOver={() => handleMouseOver(categorie.id)} 
                onMouseOut={handleMouseOut} 
                onClick={() => handleClick(categorie.title)}
                className={`categories--list ${isSelected ? 'categories--list--selected' : ''} ${window.location.href.includes(`&ags=`) ? '' : ''}`}
                key={categorie.id}
                >
                    <img className='categories--logo' src={isSelected || isHovered === categorie.id ? categorie.lightimg : categorie.img} alt={categorie.alt} />
                    {categorie.title}
                </li>
        )
    })
    return(
        <section>
            <ul className='categories'>{categoriesList}</ul>
        </section>
    );
}

export default Categories;