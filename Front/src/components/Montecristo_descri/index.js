import './style.scss';
import Map from '../Map/map';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faArrowUpFromSquare } from '@fortawesome/free-regular-svg-icons';



function montedescription({ etablishData, detailData }){
    if (!etablishData){
        return 'Loading mon reuf'
    }
    const { name: etablishName, image: etablishImg } = etablishData;
    const { price, name: serviceName, image: serviceImg, extras } = detailData;

    return(
        <section className='descrimonte '>
            <div className='descrimonte-img'>
                <img  className='descrimonte-img-first' src={`http://localhost:3000${etablishImg}`}></img>
                <div className='descrimonte-img-div'>
                    <img className='descrimonte-img-div-bar' src={`http://localhost:3000${etablishImg}`}></img>
                    <div className='descrimonte-img-div-cocktail'>
                        <img src={`http://localhost:3000${serviceImg}`}></img>
                        <img src={`http://localhost:3000${serviceImg}`}></img>
                    </div>
                </div>
                <Map />
            </div>
            <div className='descrimonte-text'>
                <div className='descrimonte-text-descri'>
                    <div className='descrimonte-text-descri-prix'>
                        <p>{etablishName}</p>
                        <p>{price}&#8364;</p>
                    </div>
                    <div className='descrimonte-text-descri-symbole'>
                        <FontAwesomeIcon className='descrimonte-text-descri-symbole-chacun' icon={faHeart} />
                        <FontAwesomeIcon className='descrimonte-text-descri-symbole-chacun' icon={faArrowUpRightFromSquare} />
                    </div>
                </div>
                <p className='descrimonte-text-title color'>{serviceName}</p>
                
            </div>


        </section>
    )
}


export default montedescription; 