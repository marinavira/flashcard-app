import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { readCard } from "../utils/api";

function StudyCard({ deckId, cards }) {
  const [index, setIndex] = useState(0);
  const [isFront, setFront] = useState(true);
  const history = useHistory();

  useEffect(() => {
    setFront(true); 
  }, [index]);

  const handleFlip = () => {
    setFront(!isFront);
  };

  const handleClick = () => {
    if (index < cards.length - 1) {
      setIndex(index + 1);
    } else {
      restartPrompt();
    }
    setFront(true); 
  };

  const restartPrompt = () => {
    const confirmed = window.confirm("Would you like to restart?");
    if (confirmed) {
      setIndex(0);
    } else {
      history.push("/");
    }
    setFront(true); // Ensure front side is shown for the restarted deck
  };

  return (
    <div>
       <p>Card {index + 1} of {cards.length}</p>
      <div className="card mx-auto">
        <div className="card-body">
          {isFront ? cards[index].front : cards[index].back}
        </div>
        <div className="card-footer">
          <button className="btn btn-primary" onClick={handleFlip}>Flip</button>
          {!isFront && (
            <button
              className="btn btn-success"
              onClick={handleClick}
            >
              {index < cards.length - 1 ? "Next" : "Restart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudyCard;