import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  postData,
  updateData,
  deleteData,
} from "../feacture/dataSlice";

function Todo() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const loading = useSelector((state) => state.data.loading);
  const error = useSelector((state) => state.data.error);

  const [formData, setFormData] = useState({ title: "", body: "" });
  const [formErrors, setFormErrors] = useState({ title: "", body: "" });

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleAdd = () => {
    if (formIsValid()) {
      dispatch(postData(formData));
      setFormData({ title: "", body: "" });
      setFormErrors({ title: "", body: "" });
    }
  };

  const handleUpdate = (id) => {
    if (formIsValid()) {
      const updatedData = { title: formData.title, body: formData.body };
      dispatch(updateData({ id, data: updatedData }));
      setFormData({ title: "", body: "" });
      setFormErrors({ title: "", body: "" });
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteData(id));
  };

  const formIsValid = () => {
    const errors = {};
    if (!formData.title) {
      errors.title = "Title is required";
    }
    if (!formData.body) {
      errors.body = "Body is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Posts</h1>
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          {formErrors.title && <span>{formErrors.title}</span>}
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
          />
          {formErrors.body && <span>{formErrors.body}</span>}
        </div>
        <button type="button" onClick={handleAdd}>
          Add Post
        </button>
        <button type="button" onClick={() => handleUpdate(data[0].id)}>
          Update First Post
        </button>
      </form>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
            <button onClick={() => handleUpdate(item.id)}>Update</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
