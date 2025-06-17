import React, { useEffect, useState } from 'react'
import { getLocalStorage } from '../../Functions.js/getLocalStorage';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { addNotes, deleteNote } from '../../Features/NoteSlice';
import { DeleteLocalStorage } from '../../Functions.js/removeItem';
import { RiDeviceRecoverLine } from "react-icons/ri";
import { setLocalStorage } from '../../Functions.js/localStroage';

export default function TrashList() {

    const [TrashLists, setTrashLists] = useState([])

    const notez = useSelector((state) => state.NoteSlice.notes);


    const trashLists = getLocalStorage("notes") || [];

    const dispatch = useDispatch();

    const handleDelete = (id) => {
        DeleteLocalStorage("notes", id);
        dispatch(deleteNote(id))
    }

    const handleRecover = (id) => {
        const confirmTrash = window.confirm("Do you want to recover this data from trash?");
        if (!confirmTrash) return;
        const currentData = getLocalStorage("notes") || [];
        const updatedData = currentData.map((note) =>
            note.id === id ? { ...note, trash: false } : note
        );
        setLocalStorage("notes", updatedData);
        dispatch(addNotes(updatedData));
    }

    useEffect(() => {
        setTrashLists(trashLists)
    }, [notez])
    console.log(TrashLists)


    return (
        <div style={{
            maxWidth: "772px",
            margin: "auto"
        }}>

            <h2 style={{
                textAlign: 'center'
            }}>This is your Trash list</h2>
            <div className="notes_container">
                {trashLists && trashLists.length > 0 ? (
                    trashLists && trashLists.map((value) => (
                        value.trash === true &&
                        <div className="notes">
                            <div className="title_container">
                                <p className="title">{value.title}</p>
                                <div className="action_container" >
                                    <RiDeleteBinLine style={{ cursor: "pointer" }} onClick={() => handleDelete(value.id)} />
                                    <RiDeviceRecoverLine onClick={() => handleRecover(value.id)} />
                                </div>
                            </div>
                            <hr />
                            <p className="description">{value.description}</p>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ marginLeft: "auto", fontSize: "12px" }}>{value.tag}</span>
                            </div>
                        </div>
                    ))
                )
                    : (
                        <p
                            style={{
                                fontWeight: "bolder",
                                fontSize: "22px",
                                textAlign: "center",
                            }}
                        >
                            Trash is empty
                        </p>
                    )}
            </div>


        </div>
    )
}
