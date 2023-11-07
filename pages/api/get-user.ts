import { readFileSync } from 'fs';
import { getBalance } from 'arweavekit/wallet';
import { transactionId } from '../../transactionid';
import { readContractState } from 'arweavekit/contract';
import type { NextApiRequest, NextApiResponse } from 'next';

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

    // read state
    const readResult = await readContractState({
      environment: 'local',
      contractTxId: transactionId,
    });

    const { users }: StateProps = readResult.readContract.cachedValue.state;

    const user = users.find((user) => user.userId === userId);
    const userBalance = await getBalance({
      environment: 'local',
      address: user.walletAddress,
      options: {
        winstonToAr: true,
      },
    });

    res.status(200).json({
      user,
      userBalance,
      message: 'SUCCESSFUL',
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
}

// todo: look into the other arweave kit functions
