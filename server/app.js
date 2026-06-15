const express = require("express");
const cors = require("cors");
require("dotenv").config();
const analyzeRouter = require("./routes/analyze");
const grammarCheck = require("./routes/grammarChecker");
const spellChecker = require("./routes/spellChecker");

const app = express();
const port = 5000;

//config cors
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5174",
      "http://localhost:5173",
      "https://ai-grammar-mern.onrender.com",
      "https://ai-grammar-by-naman-thakkar-1-e4styel1p.vercel.app/",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  }),
);
app.use(express.json()); //for parsing application/json

//routes
app.use("/api/analyze", analyzeRouter);
app.use("/api/grammarcheck", grammarCheck);
app.use("/api/spellcheck", spellChecker);
//start server

app.listen(port, "0.0.0.0", () => {
  console.log(`AI Writing app listening at http://localhost:${port}`);
});
