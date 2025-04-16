import axios from 'axios';
import dotenv from 'dotenv';
import cron from 'node-cron';
import { formatPrice } from './utils/format';
import { PricesResponse } from './interfaces/prices';

dotenv.config();

const TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

if (!TOKEN || !CHAT_ID) {
  throw new Error('BOT_TOKEN and CHAT_ID must be set in the .env file');
}

/**
 * Fetch cryptocurrency prices from CoinGecko API.
 * 
 * @returns A formatted string containing current prices and changes
 */
async function getPrices(): Promise<string> {
  const url =
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd&include_24hr_change=true';

  const { data } = await axios.get<PricesResponse>(url);

  return [
    '🚨 *Crypto Price Update (Live)*\n',
    formatPrice('BTC', data.bitcoin, '🟡'),
    formatPrice('ETH', data.ethereum, '🟣'),
    formatPrice('SOL', data.solana, '🟢'),
    formatPrice('BNB', data.binancecoin, '🔵')
  ].join('\n');
}

/**
 * Sends a formatted message to a Telegram chat using the Telegram Bot API.
 * 
 * @param message - The message to send
 */
async function postToTelegram(message: string): Promise<void> {
  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  await axios.post(url, {
    chat_id: CHAT_ID,
    text: message,
    parse_mode: 'Markdown'
  });
}

// Runs the bot every 1 Mins

cron.schedule('*/1 * * * *', async () => {
  try {
    const message = await getPrices();
    await postToTelegram(message);
    console.log(`[✅ Posted] ${new Date().toLocaleTimeString()}`);
  } catch (error: any) {
    console.error(`[❌ Error] ${new Date().toLocaleTimeString()}:`, error.message);
  }
});
