import { createContract } from 'arweavekit/contract';
import { readFileSync, writeFileSync } from 'fs'

async function deploy() {
  const { key } = JSON.parse(readFileSync('wallet.json', 'utf-8'));
  const state = readFileSync('contract/state.json', 'utf-8');
  const ctrtSource = readFileSync('contract/contract.js', 'utf-8');

  const { contractTxId } = await createContract({
    wallet: key,
    initialState: state,
    contractSource: ctrtSource,
    tags: [
      {
        name: 'App-Name',
        value: 'Zod'
      }
    ],
    environment: 'local'
  })

  writeFileSync('transactionid.js', `export const transactionId = "${contractTxId}"`)
}

deploy()