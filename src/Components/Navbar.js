import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Notes from "./Notes";
import TagsForm from "./Tags/TagsForm";
import TrashList from "./Trash/TrashList";
export default function Navbar() {
  return (
    <div>
      <ul className="navbar">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/notes">Notes</Link>
        </li>
        <li>
          <Link to="/tags">Tags</Link>
        </li>
        <li>
          <Link to="/trash">Trash</Link>
        </li>
      </ul>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/tags" element={<TagsForm />} />
        <Route path="/trash" element={<TrashList />} />
      </Routes>
    </div>
  );
}
