import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api"; 

function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const initialFormState = {
    name: "",
    description: ""
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [deck, setDeck] = useState(null);

  const { name, description } = formData;

  useEffect(() => {
    async function fetchDeck() {
      try {
        const deckData = await readDeck(deckId);
        setDeck(deckData);
        setFormData({
          name: deckData.name,
          description: deckData.description
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchDeck();
  }, [deckId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDeck({ id: deck.id, name, description });

    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck ? deck.name : ""}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            className="form-control"
            onChange={handleInputChange}
            value={name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            required={true}
            value={description}
            onChange={handleInputChange}
            rows={3}
            placeholder="Description"
          />
        </div>
        <Link to={`/decks/${deckId}`}>
          <button className="btn btn-secondary">Cancel</button>
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeck;