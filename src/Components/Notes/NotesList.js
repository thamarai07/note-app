import React, { useState } from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
import { MdEditNote, MdPushPin, MdOutlinePushPin } from "react-icons/md";
import { UpdateLocalStorageNote } from '../../Functions.js/updateLocalStorage';
import { getLocalStorage } from '../../Functions.js/getLocalStorage';
import { setLocalStorage } from '../../Functions.js/localStroage';
import { addNotes } from '../../Features/NoteSlice';
import { useDispatch } from 'react-redux';
import { GrFormView } from "react-icons/gr";
import Modal from '../Model';

export default function NotesList({ values }) {
  const { title, description, tag, id, pinned } = values;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const dispatch = useDispatch();

  const handleTrash = (id) => {
    const confirmTrash = window.confirm("Do you want to move this note to trash?");
    if (!confirmTrash) return;

    const currentData = getLocalStorage("notes") || [];
    const updatedData = currentData.map((note) =>
      note.id === id ? { ...note, trash: true } : note
    );
    setLocalStorage("notes", updatedData);
    dispatch(addNotes(updatedData));
  };


  const handleTogglePin = () => {
    UpdateLocalStorageNote("notes", id, { pinned: !pinned });
  };

  return (
    <>
      <div className="notes">
        <div className="title_container">
          <p className="title">{title}</p>
          <div className="action_container">
            <MdEditNote style={{ cursor: "pointer" }} onClick={openModal} />
            <RiDeleteBinLine style={{ cursor: "pointer" }} onClick={() => handleTrash(id)} />
            {pinned ? (
              <MdPushPin style={{ cursor: "pointer" }} onClick={handleTogglePin} />
            ) : (
              <MdOutlinePushPin style={{ cursor: "pointer" }} onClick={handleTogglePin} />
            )}
          </div>
        </div>
        <hr />
        <p className="description">{description}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ marginLeft: "auto", fontSize: "12px" }}>{tag}</span>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={title}
        id={id}
      >
        {description}
      </Modal>

    </>
  );
}
