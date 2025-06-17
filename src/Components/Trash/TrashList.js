import React, { useEffect, useState } from 'react';
import { getLocalStorage } from '../../Functions.js/getLocalStorage';
import { RiDeleteBinLine, RiDeviceRecoverLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { addNotes, deleteNote } from '../../Features/NoteSlice';
import { DeleteLocalStorage } from '../../Functions.js/removeItem';
import { setLocalStorage } from '../../Functions.js/localStroage';

export default function TrashList() {
  const [trashLists, setTrashLists] = useState(getLocalStorage('notes')?.filter(note => note.trash) || []);
  const notes = useSelector((state) => state.NoteSlice.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    const updatedTrashLists = getLocalStorage('notes')?.filter(note => note.trash) || [];
    setTrashLists(updatedTrashLists);
  }, [notes]);

  const handleDelete = (id) => {
    DeleteLocalStorage('notes', id);
    dispatch(deleteNote(id));
  };

  const handleRecover = (id) => {
    const confirmRecover = window.confirm('Do you want to recover this data from trash?');
    if (!confirmRecover) return;
    const currentData = getLocalStorage('notes') || [];
    const updatedData = currentData.map((note) =>
      note.id === id ? { ...note, trash: false } : note
    );
    setLocalStorage('notes', updatedData);
    dispatch(addNotes(updatedData));
  };

  return (
    <div
      style={{
        maxWidth: '772px',
        margin: 'auto',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>This is your Trash List</h2>
      <div className="notes_container">
        {trashLists.length > 0 ? (
          trashLists.map((note) => (
            <div className="notes" key={note.id}>
              <div className="title_container">
                <p className="title">{note.title}</p>
                <div className="action_container">
                  <RiDeleteBinLine
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(note.id)}
                  />
                  <RiDeviceRecoverLine
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRecover(note.id)}
                  />
                </div>
              </div>
              <hr />
              <p className="description">{note.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ marginLeft: 'auto', fontSize: '12px' }}>{note.tag}</span>
              </div>
            </div>
          ))
        ) : (
          <p
            style={{
              fontWeight: 'bolder',
              fontSize: '22px',
              textAlign: 'center',
            }}
          >
            Trash is Empty
          </p>
        )}
      </div>
    </div>
  );
}