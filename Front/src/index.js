import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
} from "react-router-dom";
import { AuthProvider } from './AuthContext';
import './index.scss';
import ErrorPage from "./components/Error/error-page";
import { App } from "./App";
import Auth from "./routes/auth";
import Starting from "./routes/starting";
import Admin_home from "./routes/admin/admin_home";
import Admin_create from "./routes/admin/admin_add";
import Admin_presta_account from "./routes/admin/admin_presta_account";
import Admin_client_account from "./routes/admin/admin_client_account";
import Admin_reservation from "./routes/admin/admin_reservation";
import Welcome from "./routes/welcome"
import Prestataire from "./routes/prestataire/home";
import Etablissement from "./routes/prestataire/etablissement";
import Service from "./routes/prestataire/service";
import Birth from "./routes/questionnaire/birth";
import Location from "./routes/questionnaire/location"
import Favloc from "./routes/questionnaire/favloc";
import Ambient from "./routes/questionnaire/ambient";
import Companion from "./routes/questionnaire/companionship";
import Weekend from "./routes/questionnaire/weekend";
import Night from "./routes/questionnaire/night";
import Date from "./routes/questionnaire/date";
import Drinks from "./routes/questionnaire/drinks";
import Friends from "./routes/questionnaire/friends";
import Results from "./routes/questionnaire/results";
import Welcome from "./routes/welcome";
import Confirmation from "./routes/confirmation";
import Panier from "./routes/panier";
import Client from "./routes/client";
import Account from "./routes/client/account";
import Informations from "./routes/client/informations";
import Favorites from "./routes/client/favorites";
import MyReservations from "./routes/client/myreservation";
import Monte from "./routes/montecristo";
import Search from "./routes/search";
import Commande from "./routes/prestataire/commande";
import Servicelist from "./routes/prestataire/servicelist";
import Test from "./routes/testDB";
import Transition from "./components/transition";
import Admin_Login from "./routes/admin";
import Admin_init from "./routes/admin/admin_init";
import ClientUpdateInfos from "./components/Client/UpdateInfos";
import PrestaInformations from "./routes/prestataire/informations";
import PrestaInformationsModif from "./routes/prestataire/informationsModif";
import './style.css'
import ClientUpdateInfos from "./routes/client/informationsModif";
import ConfirmationCompte from "./routes/client/compteConfirmation";
import Comment from "./routes/footer/comment";
import Contact from "./routes/footer/contact";
import Mentions from "./routes/footer/mentions";
import Termes from "./routes/footer/termes";
import Avisclient from "./routes/footer/avisclient";
import Referencement from "./routes/footer/referencement";
import Confidentialité from "./routes/footer/confidentialité";
import Aide from "./routes/footer/aide";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    
    {
        path: "/auth",
        element: <Auth />,
    },

    {
        path: "/starting",
        element: <Starting />,
    },

    {
        path: "/transition",
        element: <Transition/>,
    },

    {
        path: "/admin",
        children: [
            {
                path: "/admin",
                element: <Admin_Login />,
            },

            {
                path: "&initialisation",
                element: <Admin_init />,
            },
        ],
    },

    {
        path: "/admin/home",
        element: <Admin_home />,
    },
    {
        path: "/admin/create",
        element: <Admin_create />,
    },
    {
        path: "/admin/client/account",
        element: <Admin_client_account />,
    },
    {
        path: "/admin/presta/account",
        element: <Admin_presta_account />,
    },
    {
        path: "/admin/reservation",
        element: <Admin_reservation />,
    },
    

    {
        path: "/welcome",
        element: <Welcome />,
    },


    {
        path: "/prestataire",
        children: [
            {
                path: "/prestataire",
                element: <Prestataire />,
            },
        
            {
                path: "/prestataire/service",
                element: <Service />,
            },
        
            {
                path: "/prestataire/etablissement",
                element: <Etablissement />,
            },
            {
                path: "/prestataire/commande",
                element: <Commande />,
            },

            {
                path: "/prestataire/servicelist",
                element: <Servicelist />,
            },
            {
                path: "/prestataire/informations",
                children: [
                    {
                        path: "",
                        element: <PrestaInformations />,
                    },
                    {
                        path: "change",
                        element: <PrestaInformationsModif />,
                    }
                ]
            },
        ]
    },

    {
        path: "/confirmation",
        element: <Confirmation/>,
    },

    {
        path: "/panier",
        element: <Panier/>,
    },
    {
        path: "/monte",
        element: <Monte/>,
    },

    {
        path: "questions",
        children: [
            {
                path: "ambient",
                element: <Ambient />,
            },

            {
                path: "birth",
                element: <Birth />,
            },

            {
                path: "companionship",
                element: <Companion />,
            },

            {
                path: "date",
                element: <Date />,
            },

            {
                path: "drinks",
                element: <Drinks />,
            },

            {
                path: "favlocs",
                element: <Favloc />,
            },

            {
                path: "friends",
                element: <Friends />,
            },

            {
                path: "location",
                element: <Location />,
            },

            {
                path: "night",
                element: <Night />,
            },

            {
                path: "results",
                element: <Results />,
            },

            {
                path: "weekend",
                element: <Weekend />,
            },
        ],
    },

    {
        path: "/client",
        children: [
            {
                path: "/client",
                element: <Client />,
            },
            
            {
                path: "account",
                children: [
                    {
                    path: "",
                    element: <Account />,
                    },

                    {
                        path: "informations",
                        children: [
                            {
                                path: "",
                                element: <Informations />,
                            },
                            {
                                path: "update",
                                element: <ClientUpdateInfos />,
                            }
                        ]
                    },
                ]
            },

            {
                path: "favorites",
                element: <Favorites />
            },

            {
                path: "my-reservations",
                element: <MyReservations />,
            },

        ]
    },

    {
        path: "/search",
        element: <Search />,
    },

    {
        path: "/details/:etablissementId/:id",
        element: <Monte />,
        children: [
            {
                element: <Outlet />,
                path: "/details/:etablissementId/:id",
            }
        ]
    },

    {
        path: "/confirmation_de_compte",
        element: <ConfirmationCompte />,
    },

    {
        path: "comment",
        element: <Comment />,
    },

    {
        path: "contact",
        element: <Contact />,
    },

    {
        path: "mentions",
        element: <Mentions />,
    },

    {
        path: "termes",
        element: <Termes />,
    },

    {
        path: "avisclient",
        element: <Avisclient/>,
    },

    {
        path: "referencement",
        element: <Referencement />,
    },

    {
        path: "confidentialité",
        element: <Confidentialité />,
    },

    {
        path: "aide",
        element: <Aide />,
    },
]);

ReactDOM.createRoot(document.getElementById("app")).render(
    <React.StrictMode>
        <AuthProvider> 
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);