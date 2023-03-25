import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  {"src": "/img/amongus-1.jpg", matched: false },
  {"src": "/img/marsh-1.jpg", matched: false },
  {"src": "/img/fortnite-1.jpg", matched: false },
  {"src": "/img/mario-1.jpg", matched: false },
  {"src": "/img/pubg-1.jpg", matched: false },
  {"src": "/img/candy-1.jpg", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns]= useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)


 //shuffle cards
 const shuffleCards = () => {
  const shuffledCards = [...cardImages, ...cardImages]     //duplicates card images
  .sort(() => Math.random() - 0.5)  //-ve maintains same order, +ve switches the order around
  .map((card) => ({ ...card, id: Math.random()})) 

  setChoiceOne(null)
  setChoiceTwo(null)
  setCards(shuffledCards)
  setTurns(0)
}

//handle a choice
const handleChoice = (card) => {
 choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}

//compare 2 selected cards
useEffect(() => {
 

  if(choiceOne && choiceTwo){
    setDisabled(true)
    if(choiceOne.src === choiceTwo.src){
      setCards(prevCards => {
        return prevCards.map(card => {
          if(card.src === choiceOne.src) {
            return {...card, matched: true}
          } else {
            return card
          }
        })
      })
      resetTurn()
    } else{
       
      setTimeout(() => resetTurn(), 1000)
    }
  }
}, [choiceOne, choiceTwo])

console.log(cards)

//reset choices & increase turn
const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns +1)
  setDisabled(false)
}

//start a new game automatically
useEffect(() => {
  shuffleCards()
}, [])

  return (
    <div className="App">
      <h1>It's a Match!</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card} 
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App