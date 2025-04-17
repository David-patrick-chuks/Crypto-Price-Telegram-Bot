import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cron from 'node-cron';
import fs from 'fs';
import path from 'path';
import { getPrices, postToTelegram } from './bot';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const ENABLE_CRON = process.env.ENABLE_CRON === 'true';
const LOG_FILE = path.join(__dirname, '../logs/cron.log');

// Ensure logs directory exists
fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });

/**
 * Logs messages to both console and file.
 */
function log(message: string): void {
  const timestamp = new Date().toLocaleString();
  const logEntry = `[${timestamp}] ${message}\n`;
  console.log(logEntry.trim());
  fs.appendFileSync(LOG_FILE, logEntry);
}

/**
 * Health check endpoint
 */
app.get('/ping', (_req: Request, res: Response) => {
  res.status(200).send('🟢 Server is running');
});

/**
 * Manual price update trigger
 */
app.get('/price-update', async (_req: Request, res: Response) => {
  try {
    const message = await getPrices();
    await postToTelegram(message);
    log('✅ [Manual Trigger] Price update sent.');
    res.status(200).send('✅ Price update sent to Telegram!');
  } catch (error: any) {
    log(`❌ [Manual Error] ${error.message}`);
    res.status(500).send('❌ Error sending price update.');
  }
});

/**
 * Cron job: fetches and sends price updates every minute
 */
if (ENABLE_CRON) {
  cron.schedule('*/1 * * * *', async () => {
    try {
      log('⏰ [Cron] Running scheduled task...');
      const message = await getPrices();
      await postToTelegram(message);
      log('✅ [Cron Success] Price update sent.');
    } catch (error: any) {
      log(`❌ [Cron Error] ${error.message}`);
    }
  });
}

/**
 * Start Express server
 */
app.listen(PORT, () => {
  log(`🚀 Server started on http://localhost:${PORT}`);
});
