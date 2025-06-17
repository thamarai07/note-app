import React, { useEffect, useState } from "react";
import "../../App.css";
import { useDispatch } from "react-redux";
import { addTags } from "../../Features/TagsSlice";
import { useSelector } from "react-redux";
import { setLocalStorage } from "../../Functions.js/localStroage";
import { getLocalStorage } from "../../Functions.js/getLocalStorage";
import TagListComponent from "./TagListComponent";
export default function TagsForm() {
  const [value, setValue] = useState("");
  const [TagsList, setTagsList] = useState([]);
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.TagSlice.tags);

  const handleAddTags = (e) => {
    e.preventDefault();
    if (value.trim()) {
      dispatch(addTags(value));
      let ta = getLocalStorage("tags") || [];
      const updatedTags = [...ta, value];
      setLocalStorage("tags", updatedTags);
      setValue("");
    }
  };

  useEffect(() => {
    let list = getLocalStorage("tags");
    setTagsList(list);
  }, [tags]);

  return (
    <div className="container">
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
      <div className="mt-10">
        {TagsList ? (
          TagsList.map((value, index) => {
            let cls = index % 2 === 0 ? "one" : "two";

            return (
              <>
                <TagListComponent
                  key={index}
                  id={index}
                  tags={value}
                  clss={cls}
                />
              </>
            );
          })
        ) : (
          <p
            style={{
              textAlign: "center",
              fontSize: "22px",
              fontWeight: "bolder",
            }}
          >
            Please Add your own tags
          </p>
        )}
      </div>
    </div>
  );
}
