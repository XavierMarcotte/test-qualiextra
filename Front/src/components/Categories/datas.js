import cozy_default from "./img/cozy_default.png";
import cozy_selected from "./img/cozy_selected.png";
import elegant_default from "./img/elegant_default.png";
import elegant_selected from "./img/elegant_selected.png";
import ephemeral from "./img/ephemeral.png";
import ephemeral_selected from "./img/ephemeral_selected.png";
import modern from "./img/modern.png";
import news from "./img/news.png";
import trend_default from "./img/trend_default.png";
import trend_selected from "./img/trend_selected.png";
import unusual from "./img/unusual.png";

const categories = [
    {id: 1, title: 'Nouveautés', img: news, lightimg: news, alt: 'Logo Nouveautés'},
    {id: 2, title: 'Tendances', img: trend_default, lightimg: trend_selected, alt: 'Logo Tendances'},
    {id: 3, title: 'Éphémère', img: ephemeral, lightimg: ephemeral_selected, alt: 'Logo Éphémère'},
    {id: 4, title: 'Insolite', img: unusual, lightimg: unusual, alt: 'Logo Insolite'},
    {id: 5, title: 'Cozy', img: cozy_default, lightimg: cozy_selected, alt: 'Logo Cozy'},
    {id: 6, title: 'Élégant', img: elegant_default, lightimg: elegant_selected, alt: 'Logo Élégant'},
    {id: 7, title: 'Moderne', img: modern, lightimg: modern, alt: 'Logo Moderne'},
];

export default categories;