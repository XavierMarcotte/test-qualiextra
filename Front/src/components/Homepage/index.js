import './style.scss';
import montecristo from './img/montecristo.svg'
import degustation from './img/degustation.png'
import relax from './img/relax.png'
import timetravel from './img/timetravel.png'
import house from './img/house.png'
import skaille from './img/skaille.png'
import spaclarins from './img/spaclarins.png'
import virtualroom from './img/virtualroom.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Component } from 'react';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            prevIndex: 0,
            activeImg: 0,
            isFirstLoad: true,
        };
    }

    componentDidMount() {
        this.carouselInterval = setInterval(this.nextSlide, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.carouselInterval);
    }

    nextSlide = () => {
        const { currentIndex, isFirstLoad } = this.state;
        const numImages = 4;
        const nextIndex = (currentIndex + 1) % numImages;
        this.setState({
            prevIndex: currentIndex, 
            activeImg: nextIndex, 
        });

        setTimeout(() => {
            this.setState({ currentIndex: nextIndex });
        }, isFirstLoad ? 0 : 500); 
        if (isFirstLoad) {
            this.setState({ isFirstLoad: false });
        }
    };


    render() {
        const images = [
            skaille,
            degustation,
            timetravel,
            relax,
        ];

        const hostel = [
            montecristo,
            house,
            virtualroom,
            spaclarins,
        ]

        const packages = [
            `Restaurant à l'aveugle`,
            `Dégustation de rhum`,
            `Time travel`,
            `Body Treatments`,
        ]

        const establishments = [
            {
                name: 'Monte Cristo',
                place: 'Paris 5e',
            },
            {
                name: 'Drawing House',
                place: 'Paris 14e'
            },
            {
                name: 'Virtual Room',
                place: 'Paris 11e',
            },
            {
                name: 'Spa Clarins&MYBLEND',
                place: 'Paris 8e',
            },
        ]

        const { currentIndex, prevIndex, activeImg, isFirstLoad } = this.state;

        return (
            <section className="en_ce_moment">
                <div className="en_ce_moment_leftside">
                    <img className={`en_ce_moment_leftside_bg ${prevIndex !== currentIndex || isFirstLoad ? 'fade-out' : ''}`} 
                    src={images[currentIndex]} 
                    alt="" />
                    <p className='moment'>En ce moment</p>
                    <p className='package'>Package</p>
                    <h2 className={`homepage-title ${prevIndex !== currentIndex || isFirstLoad ? 'fade-out' : ''}`}>{packages[currentIndex]}</h2>
                </div>
                <div className="en_ce_moment_rightside">
                    <img
                        className={`en_ce_moment_rightside_img ${prevIndex !== currentIndex || isFirstLoad ? 'fade-out' : ''}`}
                        src={hostel[currentIndex]}
                        alt=""
                        />
                    <div className='en_ce_moment_rightside_monte'>
                        <p className={`en_ce_moment_rightside_monte_cristo ${prevIndex !== currentIndex || isFirstLoad ? 'fade-out' : ''}`}>{establishments[currentIndex].name}</p>
                        <i className='material-icons  en_ce_moment_rightside_monte_avis'>
                            <FontAwesomeIcon className='star' icon={faStar} />
                            4,5
                        </i>
                    </div>
                    <div className='en_ce_moment_rightside_lieux'>
                        <p className={`en_ce_moment_rightside_lieux_ville  ${prevIndex !== currentIndex || isFirstLoad ? 'fade-out' : ''}`}>{establishments[currentIndex].place}</p>
                        <button className='en_ce_moment_rightside_lieux_afficher'>Afficher</button>
                    </div>
                </div>
                <div className="carousel-button">
                    {Array.from({ length: images.length }).map((_, index) => (
                        <span
                        key={index}
                        className={`${index === activeImg ? 'active-image' : ''}`}
                        >
                        </span>
                    ))}
                </div>
            </section>
        );
    }
}


export default Homepage;