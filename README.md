# 亗 SHADOW MD 亗 — WhatsApp Bot

WhatsApp-only build using Baileys phone-number pairing. Telegram bot files and Telegram-specific dependencies have been removed.

## Requirements
- Node.js 18 or newer (Node.js 20/22 recommended)
- A WhatsApp account you own or are authorized to link

## Run locally
1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env`.
3. Set `PAIRING_NUMBER` to your full international phone number using digits only (for example, `254712345678`). Do not include `+`, spaces, or hyphens.
4. Optionally set `CUSTOM_PAIRING_CODE` to an 8-character code, or leave it blank to let WhatsApp generate one.
5. Start the bot: `npm start`
6. Read the pairing code in the terminal. On your phone, open WhatsApp → Linked devices → Link a device → Link with phone number instead, then enter the code.

If `PAIRING_NUMBER` is blank, the bot asks for the number in the terminal. For cloud deployment, set it as an environment variable in the hosting dashboard because cloud hosts may not provide an interactive terminal.

## Deploying to a Node.js host
- Build/install command: `npm install`
- Start command: `npm start`
- Runtime: Node.js 18+
- Set `BOT_NAME`, `PREFIX`, `PAIRING_NUMBER`, and optionally `CUSTOM_PAIRING_CODE` as environment variables.
- Use persistent storage for the `session/` directory. If the host deletes this directory on restart/redeploy, you will need to pair again. Keep the session private; it contains login credentials.

## Security notes
- Never upload `.env` or the `session/` directory publicly.
- The original archive included a Telegram bot token. It has been removed from this cleaned project. If that token was real, revoke/regenerate it in BotFather because it was exposed in the uploaded archive.
- Pair only an account you own or have permission to link.

## Important
This package was cleaned and source syntax-checked, but a live WhatsApp pairing test requires installing dependencies and linking a real WhatsApp account.

---

# 亗 SHADOW LINK 亗 — website pairing + 24/7 mode
Developer: 𝐒𝚳𝚰𝐋𝚵 𝚳𝚯𝐃𝐙

**The website is built into the bot.** `npm start` runs the bot together with the hacker-style
亗 SHADOW LINK 亗 pairing website. Open your bot's web address (e.g. `https://shadow-md.onrender.com`)
and the website is there, already connected — no extra setup. The page lives in `public/index.html`.

`npm start` no longer asks for a number in the terminal.
The SHADOW LINK website sends a phone number here, the server asks WhatsApp for a pairing
code and shows it on the website. Every linked number stays online and is restored
automatically after a restart.

## What keeps it online
- Automatic reconnect with back-off after every drop (built in).
- A watchdog that restarts any linked number stuck offline for 3+ minutes.
- All linked numbers are restored when the server boots.
- Crashes from a single bad message are logged instead of killing the bot.
- Self "keep-awake" ping every 4 minutes when `PUBLIC_URL` is set.

## Deploy (Render, Railway, Koyeb, Heroku, a VPS, Pterodactyl panel…)
1. Upload this folder (GitHub repo or panel upload).
2. Install command: `npm install` — Start command: `npm start` — Node.js 20 or newer.
3. Environment variables:
   - `PAIR_API_KEY` — optional password. The built-in website works without it; set it only if another
     website (like the Lovable copy of SHADOW LINK) should pair through this bot.
   - `PUBLIC_URL` — your bot's public address, e.g. `https://shadow-md.onrender.com`.
   - `CUSTOM_PAIRING_CODE` — optional, exactly 8 letters/numbers.
4. **Persistent disk:** keep the `session/` folder on a disk that survives restarts.
   Without it, everyone has to pair again after every redeploy.
5. Free plans that sleep: also add a free monitor (e.g. UptimeRobot) that opens
   `https://YOUR-BOT-URL/health` every 5 minutes.

## Endpoints
- `GET /` — the 亗 SHADOW LINK 亗 website.
- `GET /health` — status (public).
- `POST /pair` `{ "number": "254712345678" }` — returns `{ status: "code", code }` (needs `x-api-key` when called from another website).
- `GET /status?number=254712345678` — `{ linked, connected }` (needs `x-api-key` when called from another website).

Old terminal mode is still available with `npm run standalone`.
