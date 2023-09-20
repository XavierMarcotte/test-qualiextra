import './style.scss';

function Button({ name, link, style, id }){
    return(
        <>
            <a className={style} id={id} href={link}>{name}</a>
        </>
    )
}

export default Button;