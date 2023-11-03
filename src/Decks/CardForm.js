import React from "react";

function CardForm({ formData, handleInputChange, handleSaveAndRestart, handleDone }) {
  const { front, back } = formData || {};

  return (
    <form onSubmit={handleSaveAndRestart}>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          id="front"
          name="front"
          className="form-control"
          required={true}
          value={front}
          onChange={handleInputChange}
          rows={3}
        />
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          id="back"
          name="back"
          className="form-control"
          required={true}
          value={back}
          onChange={handleInputChange}
          rows={3}
        />
      </div>
    </form>
  );
}

export default CardForm;