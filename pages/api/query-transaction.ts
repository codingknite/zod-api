import { queryGQL } from 'arweavekit/graphql';
import { transactionWithId } from '../../queries/media';
import type { NextApiRequest, NextApiResponse } from 'next';

// todo use type on axios

interface APIRequestProps {
  transactionId: string;
  mediaType: 'images' | 'videos';
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { transactionId, mediaType } = req.body;

    let queryString;

    if (mediaType === 'image') {
      queryString = transactionWithId(transactionId, 'image');
    } else {
      queryString = transactionWithId(transactionId, 'video');
    }

    const response = await queryGQL(queryString, {
      gateway: 'arweave-search.goldsky.com',
      filters: {},
    });

    res.status(200).json({
      data: response,
      message: 'SUCCESSFUL',
      mediaType,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
}

// todo: look into the other arweave kit functions
