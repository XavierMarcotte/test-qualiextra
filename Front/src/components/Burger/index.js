import './style.scss';
import React, { useState } from 'react';
import ThreeBtns from './ThreeBtnsbis';

function Burger() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <div className="navbar">
                <div className={`menu-btn ${menuOpen ? 'active' : ''}`} onClick={handleMenuClick}>
                    <div className="menu-btn__burger"></div>
                </div>
                <div className={`menu ${menuOpen ? 'active' : ''}`}></div>
                {menuOpen && <ThreeBtns />}
            </div>
        </>
    );
}

export default Burger;
