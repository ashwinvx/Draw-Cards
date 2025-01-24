import './Button.css'
function Button({ deckId }) {
    const deckOfCardsAPI = "https://deckofcardsapi.com/api/deck";
    const handleClick = () => {

    }

    return (
        <>
            <button onClick={ handleClick }>GIMME A CARD!</button>
        </>
    )
}

export default Button;