import axios from "../axios-config";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import "./AddMemory.css";

const AddMemory = () => {
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", inputs.title);
    formData.append("description", inputs.description);

    try {
      const response = await axios.post("/memories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.msg);

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "image") {
      setImage(event.target.files[0]);
    } else {
      setInputs({ ...inputs, [event.target.name]: event.target.value });
    }
  };

  return (
    <div className="add-memory-page">
      <h2>Crie uma nova memória</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Título:</p>
          <input
            type="text"
            name="title"
            placeholder="Defina um título"
            onChange={handleChange}
          />
        </label>
        <label>
          <p>Descrição:</p>
          <textarea
            type="text"
            name="description"
            placeholder="Explique o que aconteceu..."
            onChange={handleChange}
          />
        </label>
        <label>
          <p>Foto:</p>
          <input type="file" name="image" onChange={handleChange} />
        </label>
        <input className="btn" type="submit" value="Enviar" />
      </form>
    </div>
  );
};

export default AddMemory;
