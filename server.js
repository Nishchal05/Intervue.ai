const express = require('express');
const { WebSocketServer } = require('ws');
const OpenAI = require('openai');
const path = require('path');
require('dotenv').config();

const assistantOptions = require('./app/assistance')

const app = express();
const port = 8080;

const server = app.listen(port, () => {
  console.log(`✅ Server is listening on http://localhost:${port}`);
});

const wss = new WebSocketServer({ server });

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTE_API,
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000/',
    'X-Title': 'Mock Interview App'
  }
});

wss.on("connection", (ws) => {
  console.log("🎧 Client connected");

  ws.on("message", async (data) => {
    try {
      const parsed = JSON.parse(data.toString());
      if (parsed.type !== "transcript") return;

      const transcript = parsed.message;
      const interviewDetails = parsed.interviewDetails || {};

      const userName = interviewDetails?.name || "Candidate";
      const questionList = interviewDetails?.interviewdetails?.questionsa || [];

      // Inject dynamic values into system prompt
      const rawSystemPrompt = assistantOptions.model.messages[0].content;

      const customizedSystemPrompt = rawSystemPrompt
        .replace("{{userName}}", userName)
        .replace("{{questionList}}", questionList.map((q, i) => `${i + 1}. ${q}`).join('\n'))
        .replace("{{jobPosition}}", interviewDetails?.interviewdetails?.domain || "Developer");

      const messages = [
        { role: "system", content: customizedSystemPrompt },
        { role: "user", content: transcript }
      ];

      const completion = await openai.chat.completions.create({
        model: assistantOptions.model.model,
        messages
      });

      const reply = completion.choices[0].message.content;
      console.log("🤖 AI:", reply);
      ws.send("🤖 AI: " + reply);
    } catch (error) {
      console.error("❌ OpenRouter API error:", error.message);
      ws.send("❌ AI Error: " + error.message);
    }
  });
});
