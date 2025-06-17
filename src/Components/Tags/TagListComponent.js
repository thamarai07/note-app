import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deleteTags } from "../../Features/TagsSlice";
import { DeleteLocalStorage } from "../../Functions.js/removeItem";
export default function TagListComponent({ tags, clss, id }) {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteTags(id));
    DeleteLocalStorage("tags", id);
  };
  return (
    <div className={`taglist_container ${clss}`}>
      <p>{tags}</p>
      <RiDeleteBinLine onClick={() => handleDelete(id)} />
    </div>
  );
}
