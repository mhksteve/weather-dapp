import algosdk from 'algosdk';
import dotenv from 'dotenv';

// load environment variables before anything else
dotenv.config();

/**
 * Validates that a required environment variable exists and returns its value.
 */
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: "${key}". ` +
        `Please check your .env file.`
    );
  }
  return value;
}

//Algorand node connection

const ALGOD_TOKEN = requireEnv('ALGOD_TOKEN');
const ALGOD_SERVER = requireEnv('ALGOD_SERVER');
const ALGOD_PORT = parseInt(process.env.ALGOD_PORT ?? '4001', 10);

export const algodClient = new algosdk.Algodv2(ALGOD_TOKEN, ALGOD_SERVER, ALGOD_PORT);

//funded account

const ACCOUNT_MNEMONIC = requireEnv('ACCOUNT_MNEMONIC');

/**
 * Using 25-word mnemonic to sign and pay for weather-storage transactions
 */
export const signerAccount = algosdk.mnemonicToSecretKey(ACCOUNT_MNEMONIC);
