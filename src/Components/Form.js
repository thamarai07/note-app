import React from "react";
import "../App.css";

export default function Form() {
  return (
    <div>
      <form className="form">
        <div className="input_container">
          <label>Title</label>
          <br />
          <input className="input" />
        </div>
        <div className="input_container">
          <label>Description</label>
          <br />
          <textarea className="input" />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
