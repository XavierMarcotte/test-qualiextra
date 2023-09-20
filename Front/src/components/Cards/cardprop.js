import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function cardprop({ textColorClass, id, nom, photo, avis, lieu, service, price, phone, description, guest, extra, etablissementId, remainingDays, limit, durationUnit, durationNumber, tags}) {
  const navigate = useNavigate();
  const [etablissement, setEtablissement] = useState(null);

  const handleNavigation = () => {
    navigate(`/details/${etablissementId}/${id}`);
  };

  useEffect(() => {
    fetch(`http://localhost:3000/prestataire/etablissement/${etablissementId}`)
      .then(response => response.json())
      .then(data => {
        setEtablissement(data);
      })
      .catch(error => console.error(`Erreur lors du chargement de l'établissement:`, error));
  }, [etablissementId]);

  return (
    <div className="faire">
      {photo && <img src={`http://localhost:3000${photo}`} alt={nom} />}
      <div className="faire_monte">
        {nom && <p className="faire_monte_cristo">{nom}</p>}
        {avis && (
          <i className="material-icons  faire_monte_avis">
            <FontAwesomeIcon className="star" icon={faStar} />
            {avis}
          </i>
        )}
      </div>
      <div className="faire_lieux">
        {etablissement && <p className="faire_lieux_ville">{etablissement.address}</p>}
        <button onClick={handleNavigation} className="faire_lieux_afficher">Afficher</button>
      </div>
      <div className="faire_etablissement">
        {service && <p>Services proposés: {service}</p>}
        {price && <p>Prix moyen des services: {price} €</p>}
        {phone && <p>Numéro de téléphone: {phone}</p>}
        {description && <p className='description-card'>Description: {description}</p>}
        {durationNumber && <p>Durée de l'expérience : {durationNumber} {durationUnit}</p>}
        {extra && <p>Extras: {extra}</p>}
        {guest && <p>Places restantes: {guest}</p>}
        {limit && <p>Nombre de convives max par réservation: {limit}</p>}
        {tags && <p>{tags}</p>}
        {remainingDays && <p className={textColorClass}>Jour(s) restant(s) : {remainingDays}</p>}
      </div>
    </div>
  );
}

export default cardprop;