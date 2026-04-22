import algosdk from 'algosdk';
import { algodClient, signerAccount } from '../config/config';
import { WeatherData } from '../types/global';

export async function storeWeatherData(weatherData: WeatherData): Promise<string> {
  // 1.encode the weather payload as a compact binary blob
  const encodedData: Uint8Array = algosdk.msgpackRawEncode(weatherData);

  // 2.fetch the latest suggested parameters (fee, round validity, etc.)
  const suggestedParams = await algodClient.getTransactionParams().do();

  // 3.build a 0-ALGO self-payment
  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    sender: signerAccount.addr,
    receiver: signerAccount.addr,
    amount: 0,
    note: encodedData, //the note field carries the data
    suggestedParams,
  });

  // 4.sign the transaction with the account's private key
  const signedTxn: Uint8Array = txn.signTxn(signerAccount.sk);

  // 5.submit to the network and wait for confirmation
  const { txid } = await algodClient.sendRawTransaction(signedTxn).do();
  await algosdk.waitForConfirmation(algodClient, txid, 4);

  return txid;
}
