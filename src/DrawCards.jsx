import Card from "./Card";
import './DrawCards.css'
import { useState, useEffect, useRef } from "react";
import axios from "axios";
const deckOfCardsAPI = "https://deckofcardsapi.com/api/deck";
function DrawCards() {
    const [deckId, setDeckId] = useState('');
    const [drawn, setDrawn] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const timerRef = useRef();
    useEffect(() => {
        async function newDeck() {
            const res = await axios.get(`${deckOfCardsAPI}/new/shuffle`);
            console.log('deckId-->', res.data.deck_id)
            setDeckId(res.data.deck_id);
        }
        newDeck();
    }, [])
    useEffect(() => {
        const draw = async () => {
            try {
                const res = await axios.get(`${deckOfCardsAPI}/${deckId}/draw`);
                console.log('card-->', res.data);
                if (res.data.remaining === 0) {
                    setIsDrawing(false);
                    throw new Error("Deck empty!");
                }
                const card = res.data.cards[0];
                setDrawn(d => [
                    ...d, { id: card.code, image: card.image }
                ]);
            } catch (err) {
                alert(err);
            }
        }
        if (isDrawing) {
            timerRef.current = setInterval(() => draw(), 1000);
        }

        return () => clearInterval(timerRef.current);
    }, [isDrawing, deckId])


    const shuffleDeck = async () => {
        setIsShuffling(true);
        try {
            const res = await axios.get(`${deckOfCardsAPI}/${deckId}/shuffle`);
            //cardArea.current.innerHTML = '';
            setDrawn([]);
            setIsDrawing(false);
            console.log('card-->', res.data);
        } catch (err) {
            alert(err);
        } finally {
            setIsShuffling(false);
        }
    }

    const toggleDraw = () => {
        setIsDrawing(c => !c);
    }
    return (
        <>
            <button onClick={ toggleDraw } disabled={ isShuffling }>{ isDrawing ? "Stop drawing" : "Start drawing" }</button>
            <button onClick={ shuffleDeck } disabled={ isShuffling }>SHUFFLE THE DECK!</button>
            <div id='card-area'>{ drawn.map(c => (<Card key={ c.id } image={ c.image } />)) }</div>
        </>
    )
}

export default DrawCards;