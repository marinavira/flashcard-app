import React, { useEffect, useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";
import ErrorMessage from "./ErrorMessage";

function DeckList() {
  const history = useHistory();
  const { url } = useRouteMatch();

  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const deckResponse = await listDecks(abortController.signal);
        setDecks(deckResponse);
      } catch (error) {
        setError(error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, []);

  async function handleDelete(deck) {
    if (window.confirm(`Delete this deck? You will not be able to recover it`)) {
      history.go(0);
      try {
        await deleteDeck(deck.id);
      } catch (error) {
        setError(error);
      }
    }
  }

  return (
    <main className="container">
      {error && <ErrorMessage error={error} />}
      <div className="card">
        <Link to={"/decks/new"}>
          <button type="button" className="btn btn-secondary btn-sm m-1">
            + Create New
          </button>
        </Link>
        <section className="col">
          {decks.map((deck) => (
            <div key={deck.id} className="card">
              <h2>{deck.name}</h2>
              <p>{deck.cards.length} cards</p>
              <p>{deck.description}</p>
              <div>
                <Link to={`/decks/${deck.id}/study`}>
                  <button className="btn btn-primary mr-2">Study</button>
                </Link>
                <Link to={`/decks/${deck.id}`}>
                  <button className="btn btn-secondary mr-2">View</button>
                </Link>
                <button
                  className="btn btn-danger ml-4"
                  onClick={() => handleDelete(deck)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

export default DeckList;