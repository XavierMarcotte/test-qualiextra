import './style.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function BackChevron(){
    const navigate = useNavigate();
    return(
        <>
            <a className='backchevron' aria-label='page précédente' onClick={() => navigate(-1)}> <FontAwesomeIcon icon={faChevronLeft} /></a>
        </>
    )
}

export default BackChevron;