import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
  const history = useHistory();

  const initialFormState = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const { name, description } = formData;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createDeck(formData)
      .then(() => setFormData({ ...initialFormState }))
      .then(() => history.push("/"));
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <div className="container">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            onChange={handleInputChange}
            value={name}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            required={true}
            value={description}
            onChange={handleInputChange}
            rows={3}
            placeholder="Description"
            className="form-control"
          />
        </div>
        <div className="text-center">
          <Link to="/" className="btn btn-danger mr-2">Cancel</Link>
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</div>

    </div>
  );
}

export default CreateDeck;