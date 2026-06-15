const express = require("express");
const grammarCheck = express.Router();
const axios = require("axios");
require("dotenv").config();

grammarCheck.post("/", async (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const response = await axios.post(
      "https://genai.vedshil.com/v1/chat/completions",
      {
        model: "Kryonex-G",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that corrects grammar. Return only corrected text.",
          },
          { role: "user", content: text },
        ],
        max_tokens: 1000,
        temperature: 0.3,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      },
    );

    console.log("API RESPONSE:", response.data);

    const correctedText =
      response?.data?.choices?.[0]?.message?.content?.trim() ||
      response?.data?.result ||
      response?.data?.text ||
      response?.data?.output;

    if (!correctedText) {
      return res.status(500).json({
        error: "Unexpected API response format",
        raw: response.data,
      });
    }

    return res.json({ correctedText });
  } catch (error) {
    console.error(
      "Error checking grammar:",
      error?.response?.data || error.message,
    );

    return res.status(500).json({
      error: error?.response?.data || error.message,
    });
  }
});

module.exports = grammarCheck;
