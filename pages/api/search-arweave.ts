import { queryAllTransactionsGQL } from 'arweavekit/graphql';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  documentQuery,
  permawebQuery,
  searchDocWithTxnId,
  searchPageWithTxnId,
} from '../../queries/search';

interface APIRequestProps {
  searchString: string;
  transactionId: string;
  categoryType: 'pages' | 'documents';
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      categoryType = 'pages',
      searchString,
      transactionId = 'DR5vsUD8Af0fHDNO_bWEtpDxuwOqQhKDqo9KvMZdcm4',
    }: APIRequestProps = req.body;

    let queryString;

    if (categoryType === 'pages') {
      if (transactionId) {
        queryString = searchPageWithTxnId(transactionId);
      } else if (searchString) {
        queryString = permawebQuery(searchString);
      }
    } else {
      if (transactionId) {
        queryString = searchDocWithTxnId(transactionId);
      } else if (searchString) {
        queryString = documentQuery(searchString);
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
      query: queryString,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
}

// todo: look into the other arweave kit functions
