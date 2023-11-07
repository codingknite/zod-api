import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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
    const { email, password } = req.body;

    const readState = await readContractState({
      environment: 'local',
      contractTxId: transactionId,
    });

    const { users }: StateProps = readState.readContract.cachedValue.state;

    const user = users.find((user) => user.email === email);

    if (user) {
      const checkEmail = user.email === email;

      const checkPassword = await bcrypt.compare(password, user.password);

      const token = jwt.sign(
        {
          email,
          userId: user.userId,
        },
        'your_secret_key',
        { expiresIn: '100y' }
      );

      if (checkEmail && checkPassword) {
        res.status(200).json({
          token,
          userId: user.userId,
          message: 'SUCCESSFUL LOGIN',
        });
      } else if (!checkPassword || !checkEmail) {
        res.status(200).json({
          message: 'WRONG CREDENTIALS',
        });
      }
    } else {
      res.status(200).json({
        message: 'USER NOT FOUND',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
}
