import type { NextApiRequest, NextApiResponse } from 'next';
import getPermawebNewsFeed from '../../utils/newsFeed';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const newsFeed = await getPermawebNewsFeed();

    res.status(200).json({
      message: 'SUCCESSFUL',
      feed: newsFeed,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
}
