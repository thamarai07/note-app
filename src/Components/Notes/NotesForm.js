import React, { useEffect, useState } from "react";
import "../../App.css";
import { getLocalStorage } from "../../Functions.js/getLocalStorage";
import { setLocalStorage } from "../../Functions.js/localStroage";
import { addNotes } from "../../Features/NoteSlice";
import { useDispatch, useSelector } from "react-redux";
import NotesListComponent from "./NotesList";

export default function Form() {
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const [AllNotes, setAllNotes] = useState([]);
  const [NoteList, setNoteList] = useState([]);
  const [Search, setSearch] = useState("");

  const tagsList = getLocalStorage("tags") || [];
  const dispatch = useDispatch();
  const notez = useSelector((state) => state.NoteSlice.notes);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.title && note.description && note.tag) {
      const newNote = { ...note, id: Date.now(), pinned: false };

      dispatch(addNotes(newNote));

      const updatedNotes = [...AllNotes, newNote];
      setLocalStorage("notes", updatedNotes);
      setNote({ title: "", description: "", tag: "" });
    } else {
      alert("Please fill all fields");
    }
  };

  useEffect(() => {
    const syncNotes = () => {
      const list = getLocalStorage("notes") || [];
      const sortedList = [...list].sort((a, b) => (b.pinned === true) - (a.pinned === true));
      const filteredList = sortedList.filter(note => note.trash !== true);
      setAllNotes(filteredList);
      setNoteList(filteredList);
    };


    syncNotes();
    window.addEventListener("storage", syncNotes);

    return () => window.removeEventListener("storage", syncNotes);
  }, [notez]);



  useEffect(() => {
    if (Search === "") {
      setNoteList(AllNotes);
    } else {
      const filtered = AllNotes.filter((note) =>
        note.title.toLowerCase().includes(Search.toLowerCase()) ||
        note.description.toLowerCase().includes(Search.toLowerCase()) ||
        note.tag.toLowerCase().includes(Search.toLowerCase())
      );

      setNoteList(filtered);
    }
  }, [Search, AllNotes]);


  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input_container">
          <label>Title</label>
          <br />
          <input
            name="title"
            className="input"
            value={note.title}
            onChange={handleChange}
          />
        </div>
        <div className="input_container">
          <label>Description</label>
          <br />
          <textarea
            name="description"
            className="input"
            value={note.description}
            onChange={handleChange}
          />
        </div>
        <div className="input_container">
          <label>Tags</label>
          <select
            name="tag"
            className="input"
            value={note.tag}
            onChange={handleChange}
          >
            <option value="">Please Select Tag</option>
            {tagsList.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>

      <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
        <p style={{
          fontSize: "20px",
          marginBottom: "10px"
        }}>Search</p>
        {/* <select className="input" value={Search} onChange={handleSelectChange}>
          <option value="">All Tags</option>
          {tagsList.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select> */}
        <input
          type="text"
          className="input"
          placeholder="Search notes..."
          value={Search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="notes_container">
          {NoteList && NoteList.length > 0 ? (
            NoteList.map((values) => (
              <NotesListComponent key={values.id} values={values} />
            ))
          ) : (
            <p
              style={{
                fontWeight: "bolder",
                fontSize: "22px",
                textAlign: "center",
              }}
            >
              Please Add Some Note
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
