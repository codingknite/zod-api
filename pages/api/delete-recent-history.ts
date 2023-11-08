import { readFileSync } from 'fs';
import { transactionId } from '../../transactionid';
import type { NextApiRequest, NextApiResponse } from 'next';
import { writeContract, readContractState } from 'arweavekit/contract';

interface User {
  email: string;
  userId: string;
  password: string;
  fullName: string;
  walletAddress: string;
}
interface StateProps {
  users: User[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userId } = req.body;
    const { key } = JSON.parse(readFileSync('wallet.json', 'utf-8'));

    const readState = await readContractState({
      environment: 'local',
      contractTxId: transactionId,
    });

    const { recentSearches }: StateProps =
      readState.readContract.cachedValue.state;

    const user = recentSearches.find((item) => item.userId === userId);

    if (user) {
      const deleteSearches = await writeContract({
        wallet: key,
        options: {
          function: 'deleteRecentSearches',
          data: {
            userId,
          },
        },
        environment: 'local',
        contractTxId: transactionId,
      });

      res.status(200).json({
        message: 'SUCCESSFUL',
        state: deleteSearches.state,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
}
