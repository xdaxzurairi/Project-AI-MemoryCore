#!/usr/bin/env node
/**
 * send-diary-telegram.js
 * Hantar diary hari ini ke Telegram @Xdibax_bot
 * Usage: node scripts/send-diary-telegram.js [YYYY-MM-DD]
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Load .env dari root vault
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [key, ...val] = line.split('=');
    if (key && val.length) process.env[key.trim()] = val.join('=').trim();
  });
}

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!TOKEN || !CHAT_ID) {
  console.error('ERROR: TELEGRAM_BOT_TOKEN atau TELEGRAM_CHAT_ID tiada dalam .env');
  process.exit(1);
}

// Tentukan tarikh
const dateArg = process.argv[2];
const today = dateArg || new Date().toISOString().slice(0, 10);

// Cari fail diary
const diaryDir = path.join(__dirname, '..', 'daily-diary', 'current');
const diaryFile = path.join(diaryDir, `${today}.md`);

if (!fs.existsSync(diaryFile)) {
  console.error(`ERROR: Fail diary tidak dijumpai: ${diaryFile}`);
  process.exit(1);
}

const content = fs.readFileSync(diaryFile, 'utf8');
console.log(`Diary: ${diaryFile} (${content.length} chars)`);

// Split kepada chunks (Telegram limit 4096 chars per message)
const CHUNK_SIZE = 4000;
const chunks = [];
for (let i = 0; i < content.length; i += CHUNK_SIZE) {
  chunks.push(content.slice(i, i + CHUNK_SIZE));
}

// Hantar satu message via HTTPS
function sendMessage(text, parseMode) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: parseMode || undefined,
    });

    const options = {
      hostname: 'api.telegram.org',
      path: `/bot${TOKEN}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve({ ok: false, raw: data });
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  // Header message
  const header = `📓 *DIBA Diary — ${today}*\n_(${chunks.length} bahagian)_`;
  const headerResult = await sendMessage(header, 'Markdown');
  if (!headerResult.ok) {
    console.warn('Header send gagal, teruskan...');
  }

  let sent = 0;
  for (let i = 0; i < chunks.length; i++) {
    const part = chunks.length > 1 ? `[${i + 1}/${chunks.length}]\n` : '';
    const text = part + chunks[i];

    // Cuba Markdown dulu, fallback plain text
    let result = await sendMessage(text, 'Markdown');
    if (!result.ok) {
      console.warn(`Part ${i + 1}: Markdown gagal, cuba plain text...`);
      result = await sendMessage(text);
    }

    if (result.ok) {
      sent++;
      console.log(`Part ${i + 1}/${chunks.length}: ok`);
    } else {
      console.error(`Part ${i + 1}/${chunks.length}: GAGAL`, JSON.stringify(result));
    }

    // Delay kecil antara chunks
    if (i < chunks.length - 1) {
      await new Promise(r => setTimeout(r, 300));
    }
  }

  console.log(`\nSelesai: ${sent}/${chunks.length} bahagian dihantar ke Telegram.`);
  if (sent < chunks.length) process.exit(1);
}

main().catch(err => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
