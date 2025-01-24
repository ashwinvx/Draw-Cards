// import Button from "./Button";
// import Cards from "./Cards";
import './DrawCards.css'
import { useState, useEffect, useRef } from "react";
import axios from "axios";
function DrawCards() {
    const [deckId, setDeckId] = useState('');
    const deckOfCardsAPI = "https://deckofcardsapi.com/api/deck";
    const cardArea = useRef();
    useEffect(() => {
        async function newDeck() {
            const res = await axios.get(`${deckOfCardsAPI}/new/shuffle`);
            console.log('deckId-->', res.data.deck_id)
            setDeckId(res.data.deck_id);
        }
        newDeck();
    }, [])
    const handleClick = async () => {
        const res = await axios.get(`${deckOfCardsAPI}/${deckId}/draw`);
        console.log('card-->', res.data);
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        if (res.data.cards.length > 0) {
            cardArea.current.innerHTML += '<img width="200" height="300" style="transform:translate(' + randomX + 'px, ' + randomY + 'px) rotate(' + angle + 'deg)" src= ' + res.data.cards[0].image + '>';
        } else {
            alert('Error: no cards remaining!');
        }
    }

    const shuffleDeck = async () => {
        const res = await axios.get(`${deckOfCardsAPI}/${deckId}/shuffle`);
        cardArea.current.innerHTML = '';
        console.log('card-->', res.data);
    }
    return (
        <>
            <button onClick={ handleClick }>GIMME A CARD!</button>
            <button onClick={ shuffleDeck }>SHUFFLE THE DECK!</button>
            <div id='card-area' ref={ cardArea }></div>
        </>
    )
}

export default DrawCards;