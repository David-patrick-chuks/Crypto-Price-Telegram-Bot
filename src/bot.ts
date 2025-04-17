import axios from "axios";
import dotenv from "dotenv";
import { formatPrice } from "./utils/format";
import { PricesResponse } from "./interfaces/prices";

dotenv.config();

const TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

if (!TOKEN || !CHAT_ID) {
  throw new Error("BOT_TOKEN and CHAT_ID must be set in the .env file");
}

/**
 * Fetch cryptocurrency prices from CoinGecko API.
 *
 * @returns A formatted string with prices and 24hr change
 */
export async function getPrices(): Promise<string> {
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd&include_24hr_change=true";

  const { data } = await axios.get<PricesResponse>(url);

  return [
    "🚨 *Crypto Price Update (Live)*\n",
    formatPrice("BTC", data.bitcoin, "🟡"),
    formatPrice("ETH", data.ethereum, "🟣"),
    formatPrice("SOL", data.solana, "🟢"),
    formatPrice("BNB", data.binancecoin, "🔵"),
  ].join("\n");
}

/**
 * Send a message to the Telegram chat.
 *
 * @param message - Message to send
 */
export async function postToTelegram(message: string): Promise<void> {
  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  await axios.post(url, {
    chat_id: CHAT_ID,
    text: message,
    parse_mode: "Markdown",
  });
}
