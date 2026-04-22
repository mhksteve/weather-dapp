import algosdk from 'algosdk';
import { algodClient, signerAccount } from '../config/config';
import { WeatherData } from '../types/global';

/**
 * @param weatherData - The weather reading to persist on-chain.
 * @returns The confirmed transaction ID (txId) that acts as a receipt.
 * @throws Will throw if the node is unreachable or the account has no funds.
 */
export async function storeWeatherData(weatherData: WeatherData): Promise<string> {
  // encode the weather payload as a compact binary blob
  const encodedData: Uint8Array = algosdk.msgpackRawEncode(weatherData);

  // fetch the latest suggested parameters (fee, round validity, etc.)
  const suggestedParams = await algodClient.getTransactionParams().do();

  // build a 0-ALGO self-payment
  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    sender: signerAccount.addr,
    receiver: signerAccount.addr,
    amount: 0,
    note: encodedData, //the note field carries the data
    suggestedParams,
  });

  // sign the transaction with the account's private key
  const signedTxn: Uint8Array = txn.signTxn(signerAccount.sk);

  // submit to the network and wait for confirmation
  const { txid } = await algodClient.sendRawTransaction(signedTxn).do();
  await algosdk.waitForConfirmation(algodClient, txid, 4);

  return txid;
}
