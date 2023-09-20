import './style.scss';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BackChevron from '../../../components/BackChevron';
function Comment(){
    return(
        <>
        <Header/>
        <section className='comment'>
            <BackChevron/>
            <h1 className='comment--title'>Comment ça <span className='color'>marche</span> ?</h1>
            <p className='comment--subtitle'>Içi nous allons vous expliqué comment ça<span className='color bold'> marche </span>!</p>
            <p className='comment--desc conditions'>Qualiextra est une entreprise qui a pour mission la mise en relation entre réceptionnistes et établissements hôteliers.</p>
            <p className='comment--desc desc2'>
            <p className='desc2'>Pourquoi ? Pour ne pas tomber dans la frustration des Smartboxs, où l’on se retrouve à n’avoir le choix qu’entre deux plats de la carte. Ici, seule la boisson n’est pas comptée dans l’offre et sera aux frais du client. Le client règle son menu et se laisse surprendre par la sélection du chef. </p>
            
            <p className='desc2'>Un restaurant avec un menu à l’aveugle + une expérience si le lieu le propose 
            Pourquoi ? Si le client ne souhaite pas rentrer de suite chez lui après le dîner mais souhaite prolonger l’expérience, il pourra choisir d’avoir une dégustation d’alcool (avant ou après) ou alors une expérience plus singulière comme l’ice bar, ou alors un cocktail offert dans un bar branché de la capitale.</p>
            
            <p className='desc2'>Une ou plusieurs nuits d’hôtels + une ou plusieurs expériences liées à cet hôtel 
            Pourquoi ? Parce qu’une nuitée simple reste standard, surtout si l’on habite Paris, on propose de vivre quelque chose d’extraordinaire. On fait vivre au client une expérience qui va le marquer. Que ce soit un spa, une dégustation d’alcool, un restaurant ou les 3 réunis, le client va pouvoir vivre une expérience qui peut durer de quelques heures à plusieurs jours.  </p>
            </p>

        </section>
        <Footer/>
        </>
    )
}
export default Comment;