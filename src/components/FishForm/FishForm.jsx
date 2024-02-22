import React from "react";
import "./FishForm.css";
import { useState } from "react";

function FishForm({ data, onAdd, onChange, validation }) {
  return (
    <div className="fish-form">
      <input
        type="text"
        placeholder="name of fish"
        name="name"
        value={data.name}
        onChange={onChange}
      />
      <fieldset>
        <label htmlFor="small">Small</label>
        <input
          type="radio"
          name="kind"
          id="small"
          value={"small"}
          onChange={onChange}
          checked={data.kind === "small"}
        ></input>
        <label htmlFor="large">Large</label>
        <input
          type="radio"
          name="kind"
          value={"large"}
          onChange={onChange}
          checked={data.kind === "large"}
        ></input>
      </fieldset>
      <button disabled={!validation} onClick={onAdd}>
        Add fish
      </button>
    </div>
  );
}

export default FishForm;
