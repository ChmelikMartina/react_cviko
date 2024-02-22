import React, { useEffect, useState } from "react";
import "./AquariumForm.css";

function AquariumForm({ data }) {
  const [tempVol, setTempVol] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [reqVol, setReqVol] = useState(0);
  const [valid, setValid] = useState(false);
  const [volume, setVolume] = useState(0);

  const handleChange = (e) => {
    const source = e.target.name;
    switch (source) {
      case "x": {
        setTempVol({
          x: e.target.value,
          y: tempVol.y,
          z: tempVol.z,
        });
        break;
      }
      case "y": {
        setTempVol({
          x: tempVol.x,
          y: e.target.value,
          z: tempVol.z,
        });
        break;
      }
      case "z": {
        setTempVol({
          x: tempVol.x,
          y: tempVol.y,
          z: e.target.value,
        });
        break;
      }
      default:
        break;
    }
    validateAquarium();
  };

  function validateAquarium() {
    let temp = 0;
    data.forEach((item) => {
      if (item.kind === "small") {
        temp += 10;
      } else if (item.kind === "large") {
        temp += 20;
      }
    });
    setReqVol(temp);

    // vypocet zadaneho objemu
    let vol = Math.round(tempVol.x * tempVol.y * tempVol.z * 0.001, 2);
    setVolume(vol);

    // efekt na tlacitku
    if (vol < temp) {
      setValid(false);
    } else {
      setValid(true);
      return false;
    }
  }
  function onAdd() {
    alert("Aquarium created");
  }
  useEffect(() => {
    validateAquarium();
  });

  return (
    <div className="aquarium-form">
      <div className="inputs">
        <label htmlFor="x">sirka v cm</label>
        <input
          type="number"
          placeholder="sirka"
          name="x"
          min="0"
          value={tempVol.x}
          onChange={handleChange}
        ></input>
        <label htmlFor="y">vyska v cm</label>
        <input
          type="number"
          placeholder="vyska"
          name="y"
          min="0"
          value={tempVol.y}
          onChange={handleChange}
        ></input>
        <label htmlFor="z">hloubka v cm</label>
        <input
          type="number"
          placeholder="hloubka"
          name="z"
          min="0"
          value={tempVol.z}
          onChange={handleChange}
        ></input>
      </div>
      <div className="inputs">
        <button className="btnAqua" disabled={!valid} onClick={onAdd}>
          Create aquarium
        </button>
        <div>Your aquarium requires: {reqVol} l</div>
        <div>Current volume of aquarium: {volume}l</div>
      </div>
    </div>
  );
}

export default AquariumForm;
