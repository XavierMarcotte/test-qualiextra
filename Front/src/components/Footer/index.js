import './style.scss'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useEffect } from 'react';

function Footer() {
    useEffect(() => {
      const currentURL = window.location.href;

      if (currentURL.includes('auth') || currentURL.includes('starting') || currentURL.includes('panier') || currentURL.includes('confirmation')) {
        const footer = document.querySelector('footer');
        const liElements = document.querySelectorAll('.column--container--list--links');
  
        footer.classList.add('dark');
  
        liElements.forEach((li) => {
          li.classList.remove('column--container--list--links');
          li.classList.add('column--container--list--links--dark');
        });
      }
    }, []);
  return (
    <>
      <footer>
        <div className="column">
          <ul className="column--container">
            <li className="column--container--list"><a className="column--container--list--links" href="/contact">Contact</a></li>
            <li className="column--container--list"><a className="column--container--list--links" href="/comment">Comment ça marche</a></li>
            <li className="column--container--list"><a className="column--container--list--links" href="/referencement">Référencement</a></li>
            <li className="column--container--list"><a className="column--container--list--links" href="/aide">Aide & Service clients</a></li>
          </ul>
          <ul className="column--container">
            <li className="column--container--list"><a className="column--container--list--links" href="/mentions">Mentions légales</a></li>
            <li className="column--container--list"><a className="column--container--list--links" href="/termes">Termes & Conditions</a></li>
            <li className="column--container--list"><a className="column--container--list--links" href="/confidentialité">Politique de confidentialité</a></li>
            <li className="column--container--list"><a className="column--container--list--links" href="/avisclient">Ce que les clients en pensent</a></li>
          </ul>
        </div>
        <div className='container--links'>
          <a className='container--links--link' href="http://Instagram.com" aria-label='Lien Instagram'><FontAwesomeIcon icon={faInstagram} /></a>
          <a className='container--links--link' href='http://Linkedin.com' aria-label='Lien Linkedin'><FontAwesomeIcon icon={faLinkedin} /></a>
          <a className='container--links--link' href='http://Facebook.com' aria-label='Lien Facebook'><FontAwesomeIcon icon={faFacebook} /></a>
        </div>
      </footer>
  </>
  );
}

export default Footer;