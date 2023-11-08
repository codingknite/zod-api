import {
  noInput,
  transactionWithId,
  withSearchString,
} from '../../queries/media';
import { queryAllTransactionsGQL } from 'arweavekit/graphql';
import type { NextApiRequest, NextApiResponse } from 'next';

interface APIRequestProps {
  searchString: string;
  transactionId: string;
  mediaType: 'images' | 'videos';
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { mediaType, searchString, transactionId }: APIRequestProps =
      req.body;

    let queryString;

    if (mediaType === 'images') {
      if (!transactionId && !searchString) {
        queryString = noInput('image');
      } else if (transactionId) {
        queryString = transactionWithId(transactionId, 'image');
      } else if (searchString) {
        queryString = withSearchString(searchString, 'image');
      }
    } else {
      if (!transactionId && !searchString) {
        queryString = noInput('video');
      } else if (transactionId) {
        queryString = transactionWithId(transactionId, 'video');
      } else if (searchString) {
        queryString = withSearchString(searchString, 'video');
      }
    }

    const response = await queryAllTransactionsGQL(queryString, {
      gateway: 'arweave-search.goldsky.com',
      filters: {},
    });

    res.status(200).json({
      message: 'SUCCESSFUL',
      data: response,
      count: response.length,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
}
