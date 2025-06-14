import React, { useState } from "react";
import "../App.css";

export default function TagsForm() {
  const [value, setValue] = useState("");
  const handleAddTags = () => {
    if (value.trim()) {
      setValue(value);
    }
  };
  return (
    <div>
      <form className="form">
        <div className="input_container">
          <label>Tags</label>
          <br />
          <input
            className="input"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </div>
        <button onClick={handleAddTags}>Submit</button>
      </form>
    </div>
  );
}
