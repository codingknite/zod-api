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
    const { text, userId } = req.body;
    const { key } = JSON.parse(readFileSync('wallet.json', 'utf-8'));

    const readState = await readContractState({
      environment: 'local',
      contractTxId: transactionId,
    });

    const { history }: StateProps = readState.readContract.cachedValue.state;

    const user = history.find((item) => item.userId === userId);

    if (user) {
      const updateSearches = await writeContract({
        wallet: key,
        options: {
          function: 'updateHistory',
          data: {
            userId,
            text,
          },
        },
        environment: 'local',
        contractTxId: transactionId,
      });

      res.status(200).json({
        message: 'SUCCESSFUL',
        data: updateSearches.state,
      });
    } else {
      const addSearch = await writeContract({
        wallet: key,
        options: {
          function: 'addNewHistory',
          data: {
            userId,
            text,
          },
        },
        environment: 'local',
        contractTxId: transactionId,
      });

      res.status(200).json({
        message: 'SUCCESSFUL',
        data: addSearch.state,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
}
