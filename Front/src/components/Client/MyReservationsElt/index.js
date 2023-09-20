import './style.scss';
import List from '../../List';
import clientaccount from './board.js';
import BackChevron from '../../BackChevron';
function MyReservationsElt(){
    return (
        <>
        <List 
            title='Mes réservations'
            headfirst='Date '
            headsecond='Service '
            headthird='Participant '
            headfourth='Prix total'
            listfirst='Participants : '
            listsecond='Description du service : '
            listthird='Date de réservation : '
        />
        </>
    );
};

export default MyReservationsElt;