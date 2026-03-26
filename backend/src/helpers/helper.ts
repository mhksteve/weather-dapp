import algosdk from 'algosdk';
import { algodClient, signerAccount } from '../config/config';
import { WeatherData } from '../types/global';

/**
 * Encodes weather data using MessagePack and stores it on the Algorand
 * blockchain as a zero-value self-payment transaction.
 *
 * The raw bytes live in the transaction's `note` field, making the reading
 * permanently retrievable and tamper-proof from the ledger.
 *
 * @param weatherData - The weather reading to persist on-chain.
 * @returns The confirmed transaction ID (txId) that acts as a receipt.
 * @throws Will throw if the node is unreachable or the account has no funds.
 */
export async function storeWeatherData(weatherData: WeatherData): Promise<string> {
  // 1. Encode the weather payload as a compact binary blob
  const encodedData: Uint8Array = algosdk.msgpackRawEncode(weatherData);

  // 2. Fetch the latest suggested parameters (fee, round validity, etc.)
  const suggestedParams = await algodClient.getTransactionParams().do();

  // 3. Build a 0-ALGO self-payment; the note field carries our data
  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    sender: signerAccount.addr,
    receiver: signerAccount.addr,
    amount: 0,
    note: encodedData,
    suggestedParams,
  });

  // 4. Sign the transaction with the account's private key
  const signedTxn: Uint8Array = txn.signTxn(signerAccount.sk);

  // 5. Submit to the network and wait for confirmation
  const { txid } = await algodClient.sendRawTransaction(signedTxn).do();
  await algosdk.waitForConfirmation(algodClient, txid, 4);

  return txid;
}
