import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { src: '/img/helmet-1.png', matched: false },
  { src: '/img/potion-1.png', matched: false },
  { src: '/img/ring-1.png', matched: false },
  { src: '/img/scroll-1.png', matched: false },
  { src: '/img/shield-1.png', matched: false },
  { src: '/img/sword-1.png', matched: false },
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const shuffleCard = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort((a, b) => {
        if (Math.random() < 0.5) {
          return -1;
        }
        return 1;
      })
      .map((card) => {
        return { ...card, id: Math.random() };
      });

    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  const handleChoice = (card) => {
    if (!choiceOne) {
      setChoiceOne(card);
    } else if (!choiceTwo) {
      setChoiceTwo(card);
    }
  };

  const resetChoices = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
  };

  useEffect(() => {
    shuffleCard();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      const isMatch = choiceOne.src === choiceTwo.src ? true : false;

      if (isMatch) {
        setCards((cards) => {
          return cards.map((card) => {
            return card.src === choiceOne.src
              ? { ...card, matched: true }
              : { ...card };
          });
        });

        resetChoices();
      } else {
        setTimeout(() => {
          resetChoices();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  return (
    <div className='App'>
      <h1>Magic Match</h1>
      <button onClick={shuffleCard}>New Game</button>

      <div className='card-grid'>
        {cards.map((card) => {
          return (
            <SingleCard
              handleChoice={handleChoice}
              key={card.id}
              card={card}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
            />
          );
        })}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
};

export default App;
