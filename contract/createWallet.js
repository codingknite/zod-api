import { createWallet } from 'arweavekit/wallet';
import { writeFileSync } from 'fs'

async function deploy() {
  const wallet = await createWallet({
    environment: 'local'
  })

  const { key, walletAddress } = wallet;

  writeFileSync('wallet.json', JSON.stringify({
    address: walletAddress,
    key
  }))

}

deploy()