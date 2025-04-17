/**
 * Interface representing a single cryptocurrency's USD value and 24-hour change.
 */
export interface CryptoData {
  usd: number;
  usd_24h_change: number;
}

/**
 * Interface for the response returned by CoinGecko's simple price API.
 */
export interface PricesResponse {
  bitcoin: CryptoData;
  ethereum: CryptoData;
  solana: CryptoData;
  binancecoin: CryptoData;
}
