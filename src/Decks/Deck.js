import React, { useEffect, useState } from "react";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";
import Study from "../Home/Study";
import AddCard from "./AddCard";
import EditCard from "./EditCard";

function Deck() {
  const { deckId } = useParams();
  const history = useHistory();
  const { url } = useRouteMatch();

  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        setDeck(deckResponse);
        setCards(deckResponse.cards);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, [deckId]);

  const handleDeleteDeck = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this deck?");
    if (confirmed) {
      try {
        history.push("/");
        await deleteDeck(deck.id);
        console.log("Deck deleted");
      } catch (error) {
        console.error("Error deleting deck: ", error);
      }
    }
  };

  const handleDeleteCard = async (card) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      const abortController = new AbortController();
      try {
        history.go(0);
        await deleteCard(card.id, abortController.signal);
      } catch (error) {
        console.error("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
  };

  return (
    <main className="card">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck && deck.name}</Link>
          </li>
        </ol>
      </nav>

      <h2>{deck && deck.name}</h2>
      <p>{deck && deck.description}</p>
      <div className="col mb-4">
        <Link className="btn btn-primary" to={`${url}/edit`}>
          Edit
        </Link>
        <Link className="btn btn-secondary" to={`${url}/study`}>
          Study
        </Link>
        <Link className="btn btn-light" to={`${url}/cards/new`}>
          + Add Cards
        </Link>
        <button className="btn btn-danger" onClick={handleDeleteDeck}>
          Delete
        </button>
      </div>
      <div className="col-lg-6">
        <h3>Cards {cards.length}</h3>
        <br />
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <p>{card.front}</p>
            <p>{card.back}</p>
            <div>
              <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
                <button className="btn btn-secondary">Edit</button>
              </Link>
              <button className="btn btn-danger" onClick={() => handleDeleteCard(card)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Deck;