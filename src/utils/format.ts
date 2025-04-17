import { CryptoData } from "../interfaces/prices";

/**
 * Format the crypto price and 24-hour change with emojis and symbols.
 *
 * @param label - The name or symbol of the cryptocurrency (e.g., 'BTC')
 * @param info - The crypto price and change info
 * @param emoji - An emoji icon representing the coin visually
 * @returns A formatted string for display
 */
export function formatPrice(
  label: string,
  info: CryptoData,
  emoji: string,
): string {
  const price = info.usd.toLocaleString("en-US", { minimumFractionDigits: 2 });
  const change = info.usd_24h_change.toFixed(2);
  const sign = info.usd_24h_change >= 0 ? "🔺" : "🔻";
  const prefix = info.usd_24h_change >= 0 ? "+" : "";
  return `${emoji} ${label}: $${price}  ${sign} ${prefix}${change}%`;
}
