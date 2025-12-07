# AI Receptionist (prototype)

This is a minimal prototype of an AI voice receptionist. It uses:
- Browser Web Speech API (SpeechRecognition) to capture speech and convert to text (client-side).
- Browser Speech Synthesis API to speak responses (client-side).
- A small Node.js Express server that forwards text to an LLM (OpenAI Chat Completion API) and returns replies.

This prototype is meant to be a starting point — not production-ready. It avoids sending raw audio to the server by using the browser's speech recognition. If you want full server-side STT/TTS (higher accuracy or multi-browser support), you can plug in Whisper (STT) and a TTS provider (e.g., ElevenLabs, AWS Polly, Google TTS).

Prerequisites
- Node 18+ (for global fetch)
- An OpenAI API key (set in .env)

Setup
1. Copy .env.example to .env and set your API key:
   OPENAI_API_KEY=sk-...
   OPENAI_MODEL=gpt-4o-mini
   PORT=3000

2. Install dependencies:
   npm install

3. Start the server:
   npm start

4. Open the client:
   - Visit http://localhost:3000/client.html
   - Click Start, speak, and the assistant will reply out loud.

Notes & Next steps
- Replace browser STT with a server-side STT (e.g. Whisper) for better cross-browser support.
- Replace browser TTS with a higher-quality TTS provider if needed.
- Add session/context management for multi-turn conversations and appointment booking integrations (Google Calendar, iCal).
