import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'ai-receptionist', 'public')));

// CORS for simple demos (adjust for production)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

app.post('/chat', async (req, res) => {
  const { message, context = [] } = req.body;
  if (!OPENAI_API_KEY) return res.status(500).json({ error: 'OpenAI API key not set' });

  const system = {
    role: 'system',
    content:
      'You are an AI receptionist. Be polite, concise, ask for the visitor name and reason for visit when appropriate, offer to schedule appointments, and confirm details before closing the conversation.'
  };

  const messages = [system, ...context, { role: 'user', content: message }];

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        max_tokens: 500,
        temperature: 0.3
      })
    });

    const data = await resp.json();
    const reply = data?.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || String(err) });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`AI receptionist server running on port ${PORT}`));
