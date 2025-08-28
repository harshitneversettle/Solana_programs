import {
  createInitializeAccountInstruction,
  createInitializeMint2Instruction,
  getMinimumBalanceForRentExemptAccount,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
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
  const secret = JSON.parse(process.env.privateKey!);
  const feepayer = Keypair.fromSecretKey(Uint8Array.from(secret));

  const mint = Keypair.generate();
  const mint_rent = await getMinimumBalanceForRentExemptMint(connection);
  const balance = await connection.getBalance(feepayer.publicKey, "confirmed");

  console.log(
    `Balance of Feepayer before paying the fees ${balance / LAMPORTS_PER_SOL}`
  );

  const createaccountInstruction = SystemProgram.createAccount({
    fromPubkey: feepayer.publicKey,
    newAccountPubkey: mint.publicKey,
    space: MINT_SIZE,
    lamports: mint_rent,
    programId: TOKEN_PROGRAM_ID,
  });

  const initialiseMintAccount = createInitializeMint2Instruction(
    mint.publicKey, // address of mint
    9, // decimals
    feepayer.publicKey,
    null, // fee authority
    TOKEN_PROGRAM_ID
  );

  const transaction = new Transaction().add(
    createaccountInstruction,
    initialiseMintAccount
  );

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    feepayer,
    mint
  ]);
  console.log(signature);
  const postbalance = await connection.getBalance(
    feepayer.publicKey,
    "confirmed"
  );
  console.log(postbalance / LAMPORTS_PER_SOL);
  const mintBalance = await connection.getBalance(
    mint.publicKey,
    "confirmed"
  );
  console.log(mintBalance/LAMPORTS_PER_SOL) ;
}

main();
