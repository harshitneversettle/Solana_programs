import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemInstruction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

import * as dotenv from "dotenv";

dotenv.config();


async function main() {
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );

//  const sender = Keypair.generate()
//  console.log(sender.publicKey) ;
//  const sender = new PublicKey("9B9tXSndjpZxWazgibnfpuE5QoTjSx9sxtHRFBoHEyYm");
    const secret = JSON.parse(process.env.privateKey!) ;
    const sender = Keypair.fromSecretKey(Uint8Array.from(secret)) ;

  // const receiver = Keypair.generate() ;
  // console.log(receiver.publicKey) ;
  const receiver = new PublicKey(
    "EcpZWqcdiagd3x7pr1Xknmw6yE5Lj5rDrQbtAhYUFC8a"
  );

  const sender_balance = await connection.getBalance(sender.publicKey, "confirmed");
  console.log(
    `The balance of sender before sending sol : ${
      sender_balance / LAMPORTS_PER_SOL
    }`
  );
  const reveiver_balance = await connection.getBalance(receiver, "confirmed");
  console.log(
    `The balance of receiver before receiving sol : ${
      reveiver_balance / LAMPORTS_PER_SOL
    }`
  );

  const instruction1 = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: receiver,
    lamports: 1 * LAMPORTS_PER_SOL,
  });
  const transaction1 = new Transaction().add(instruction1);

  await sendAndConfirmTransaction(
    connection ,
    transaction1 ,
    [sender] , // signer 
  )

  const sender_balance1 = await connection.getBalance(sender.publicKey, "confirmed");
  console.log(
    `The balance of sender after sending sol : ${
      sender_balance1 / LAMPORTS_PER_SOL
    }`
  );
  const reveiver_balance1 = await connection.getBalance(receiver, "confirmed");
  console.log(
    `The balance of receiver after receiving sol : ${
      reveiver_balance1 / LAMPORTS_PER_SOL
    }`
  );

}

main();
