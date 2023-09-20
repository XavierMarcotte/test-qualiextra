import './style.scss';
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import ajout from './img/ajout.png'


function etablissement(){
    const indicatifsInternationaux = [
        { code: '+1', pays: 'États-Unis' },
        { code: '+33', pays: 'France' },
        { code: '+32', pays: 'Belgique' },
        { code: '+43', pays: 'Autriche' },
        { code: '+34', pays: 'Espagne' },
        { code: '+358', pays: 'Finlande' },
      ];

      function handleSubmit(event) {
        event.preventDefault();
        const nom = event.target.elements.nom.value;
        const adresse = event.target.elements.adresse.value;
        const experiences = event.target.elements.experiences.value;
        const prix = event.target.elements.prix.value;
        const indicatif = event.target.elements.indicatif.value;
        const telephone = event.target.elements.telephone.value;
        event.target.reset();
      }
    return(
        <>
            <Header />
             <div className='container'>
                <form className='form'>
                 <h1 className='etablissement__title'>
                 Ajouter un Etablissement
                 </h1>
                 <label className='nom' htmlFor="nom">Nom*</label>
                 <input className='nom-input'type="text" id="nom" name="nom" required/>
                 <br/>
                 <label className='adresse' htmlFor="adresse">Adresse Postale*</label>
                 <input className='adresse-input' type="text" id="adresse" name="adresse" required/>
                 <br/>
                 <h2 className='sub__etablissement'>Photos de l'établissement</h2>
                 <img className='img__etablissement' src={ajout} alt="Ajouter une photo"/>
                 <br/>
                 <label className='experience' htmlFor="experiences">Expériences proposées*</label>
                 <input className='experience-input' type="text" id="experiences" name="experiences" required/>
                 <br/>
                 <label className='price' htmlFor="prix">Prix moyen des services proposés*</label>
                 <input className='price-input' type="text" id="prix" name="prix" required/>
                 <br/>
                 <label className='phone' htmlFor="telephone">Numéro de téléphone</label>
                 <select className='phone-select' id="indicatif" name="indicatif">
                   {indicatifsInternationaux.map((indicatif) => (
                     <option className='phone-option' key={indicatif.code} value={indicatif.code}>
                       {indicatif.code} ({indicatif.pays})
                     </option>
                   ))}
                 </select>
                 <input className='phone-input' type="text" id="telephone" name="telephone" />
                 <br/>
                 <div className='button-container'>
                   <button className='button'type="submit">Créer</button>
                 </div>
                </form>
            </div>   
            <Footer />
        </>
    )
}

export default etablissement;