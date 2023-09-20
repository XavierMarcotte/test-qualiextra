import './style.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Map from '../Map/map';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cardprop from '../Cards/cardprop';


function SearchResults({searchValue }){
  const [service, setServiceCard] = useState([]);
  const localSearchValue = searchValue.toLowerCase();

  useEffect(() => {
      axios.get('http://localhost:3000/prestataire/service')
          .then(response => {
              setServiceCard(response.data);
          })
          .catch(error => {
              console.error('Error fetching service data:', error);
          });
  }, []);



  const urlParams = new URLSearchParams(window.location.search);
  const arrivalDate = urlParams.get('arrivalDate');
  const departureDate = urlParams.get('departureDate');
  const keyword = urlParams.get('keyword');
  const participantCount = urlParams.get('participantCount');
  const tags = urlParams.get('tags');

  const selectedTags = tags ? tags.split(',') : [];

  const filteredServices = service.filter(service => {
    const serviceStartDate = new Date(service.startDate.slice(0, 10));
    const serviceEndDate = new Date(service.endDate.slice(0, 10));
    const serviceLimit = service.limit;

    const selectedArrivalDate = arrivalDate ? new Date(arrivalDate) : null;
    const selectedDepartureDate = departureDate ? new Date(departureDate) : null;

    const dateMatches =
        (!selectedArrivalDate || serviceStartDate >= selectedArrivalDate) &&
        (!selectedDepartureDate || serviceEndDate <= selectedDepartureDate);

    const keywordMatches =
        (!localSearchValue  || (service.title && service.title.toLowerCase().includes(searchValue.toLowerCase())) || (service.description && service.description.toLowerCase().includes(searchValue.toLowerCase())))
        &&
        (!keyword || (service.title && service.title.toLowerCase().includes(keyword.toLowerCase())) || (service.description && service.description.toLowerCase().includes(keyword.toLowerCase())));

    const participantCountMatches = !participantCount || serviceLimit >= parseInt(participantCount, 10);

    const tagMatches = selectedTags.length === 0 || (!service.tags || selectedTags.every(selectedTag => service.tags.includes(selectedTag)));

    return dateMatches && keywordMatches && participantCountMatches && tagMatches;
});

const serviceCard = filteredServices.map((service, index) => (
    <Cardprop
        key={index}
        nom={service.name}
        lieu="test"
        photo={service.image}
        className="searchresults-card"
        id={service.id}
        etablissementId={service.etablissementId}
    />
));

    return(
        <section className="searchresults">
            <div className='searchresults--left'>
                <div className="searchresults--left--filters">
                    <div className="searchresults--left--filters--div">
                        {selectedTags.map((tag, index) => (
                            <span key={index} className="searchresults--left--filters--filter">{tag}<FontAwesomeIcon className="searchresults--left--filters--filter-icon" icon={faCircleXmark} /></span>
                        ))}
                    </div>
                    <FontAwesomeIcon className="searchresults--left--filters--filterbtn" icon={faBars} />
                </div>
                <div className='searchresults--left--container'>
                    {serviceCard}
                </div>
            </div>
            <div className="searchresults--right">
                <Map />
            </div>
        </section>
    )
}


export default SearchResults;