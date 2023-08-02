const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const main = require("./db/conn");

const port = 3000;

const memoryRoutes = require("./routes");

app.use("/memories", memoryRoutes);

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
});
