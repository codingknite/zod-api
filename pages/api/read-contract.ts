import { transactionId } from '../../transactionid';
import { readContractState } from 'arweavekit/contract';
import type { NextApiRequest, NextApiResponse } from 'next';

// todo use type on axios

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const readResult = await readContractState({
      environment: 'local',
      contractTxId: transactionId,
    });

    res.status(200).json({
      message: 'SUCCESSFUL',
      transactionId,
      readResult,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
}

// todo: look into the other arweave kit functions
