import { transactionId } from '../../transactionid';
import type { NextApiRequest, NextApiResponse } from 'next';
import { readContractState } from 'arweavekit/contract';

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

    const readState = await readContractState({
      environment: 'local',
      contractTxId: transactionId,
    });

    const { history }: StateProps = readState.readContract.cachedValue.state;

    const user = history.find((item) => item.userId === userId);

    if (user) {
      res.status(200).json({
        message: 'SUCCESSFUL',
        data: user,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
}
