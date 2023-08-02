const Memory = require("../models/Memory");

const fs = require("fs");

const removeOldImage = (memory) => {
  fs.unlink(memory.src, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Imagem antiga deletada com sucesso`);
    }
  });
};

// Create a new memory
const createMemory = async (req, res) => {
  try {
    const { title, description } = req.body;
    const src = `images/${req.file.filename}`;

    console.log(req.file);

    if (!title || !description) {
      return res
        .status(400)
        .json({ msg: "Por favor, preencha todos os campos." });
    }

    const newMemory = new Memory({
      title,
      src,
      description,
    });
    await newMemory.save();
    res.json({ msg: "Memória criada com sucesso!", newMemory });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get all memories
const getMemories = async (req, res) => {
  try {
    const memories = await Memory.find();
    res.json(memories);
  } catch (err) {
    res.status(500).send({ msg: "Por favor, tente novamente" });
  }
};

// Get a single memory by ID
const getMemoryById = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);
    if (!memory) {
      return res.status(404).json({ msg: "Memória não encontrada!" });
    }
    res.json(memory);
  } catch (err) {
    res.status(500).send({ msg: "Por favor, tente novamente" });
  }
};

// Update a memory by ID
const updateMemory = async (req, res) => {
  try {
    const { title, description } = req.body;

    let src = null;

    if (req.file) {
      src = `images/${req.file.filename}`;
    }

    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({ msg: "Memória não encontrada!" });
    }

    if (src) {
      removeOldImage(memory);
    }

    const updateData = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (src) updateData.src = src;

    const updateMemory = await Memory.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updateMemory);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Por favor, tente novamente" });
  }
};

// Delete a memory by ID
const deleteMemory = async (req, res) => {
  try {
    const memory = await Memory.findByIdAndRemove(req.params.id);

    if (!memory) {
      return res.status(404).json({ msg: "Memória não encontrada!" });
    }

    removeOldImage(memory);

    res.json({ msg: "Memoria excluída" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Por favor, tente novamente" });
  }
};

// Add or remove memory from favorites
const toggleFavorite = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({ msg: "Memória não encontrada!" });
    }

    memory.favorite = !memory.favorite;

    memory.save();

    res.json({ msg: "Adicionada aos favoritos", memory });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Por favor, tente novamente" });
  }
};

// Add comment to memory
const addComment = async (req, res) => {
  try {
    console.log(req);
    const { name, text } = req.body;

    if (!name || !text) {
      return res
        .status(400)
        .json({ msg: "Por favor, preencha todos os campos." });
    }

    const comment = {
      name,
      text,
    };

    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({ msg: "Memória não encontrada!" });
    }

    memory.comments.push(comment);

    console.log(memory);

    memory.save();

    res.json({ msg: "Comentário adicionado!", memory });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Por favor, tente novamente" });
  }
};

module.exports = {
  createMemory,
  getMemories,
  getMemoryById,
  updateMemory,
  deleteMemory,
  toggleFavorite,
  addComment,
};
