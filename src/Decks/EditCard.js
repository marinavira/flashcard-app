import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard, updateDeck } from "../utils/api";
import CardForm from "./CardForm";

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const initialFormState = {
    front: "",
    back: ""
  };

  const [formData, setFormData] = useState(initialFormState);
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null); 

  const { front, back } = formData;

  useEffect(() => {
    async function fetchData() {
      try {
        const [deckData, cardData] = await Promise.all([readDeck(deckId), readCard(cardId)]);

        setDeck(deckData);
        setCard(cardData); // Set card state
        setFormData({
          front: cardData.front,
          back: cardData.back
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchData();
  }, [deckId, cardId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedCard = {
      front,
      back,
      deckId: deck.id,
      id: card.id,
    };

    updateCard(updatedCard)
      .then(() => {
        setCard({ ...card, front, back });
        return updateDeck({ id: deck.id, name: deck.name, description: deck.description });
      })
      .then(() => {
        history.push(`/decks/${deckId}`);
      })
      .catch((error) => {
        console.error("Error updating card or deck: ", error);
      });
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
      </nav>
      <h1>Edit Card</h1>
      <CardForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <Link to={`/decks/${deckId}`}>
        <button className="btn btn-secondary">Cancel</button>
      </Link>
      <Link to={`/decks/${deckId}`}>
        <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
      </Link>
    </div>
  );
}

export default EditCard;