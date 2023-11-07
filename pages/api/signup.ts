import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { createWallet } from 'arweavekit/wallet';
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
    const { fullName, email, password } = req.body;
    const { key } = JSON.parse(readFileSync('wallet.json', 'utf-8'));

    // read state
    const readResult = await readContractState({
      environment: 'local',
      contractTxId: transactionId,
    });

    const { users }: StateProps = readResult.readContract.cachedValue.state;

    const userExists = Boolean(users.find((user) => user.email === email));

    if (userExists) {
      res.status(200).json({
        message: 'USER EXISTS',
      });
    } else {
      const userWallet = await createWallet({
        environment: 'local', // todo - change to mainnet in prod
      });
      const { walletAddress } = userWallet;

      const userId = uuidv4();
      const hashedPassword = await bcrypt.hash(password, 10);

      await writeContract({
        wallet: key,
        options: {
          function: 'signup',
          data: {
            email,
            userId,
            fullName,
            walletAddress,
            hashedPassword,
          },
        },
        environment: 'local',
        contractTxId: transactionId,
      });

      const token = jwt.sign(
        {
          email,
          userId,
        },
        'your_secret_key',
        { expiresIn: '100y' }
      );

      res.status(200).json({
        token,
        userId,
        message: 'SUCCESSFUL SIGNUP',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
}

// todo: look into the other arweave kit functions
