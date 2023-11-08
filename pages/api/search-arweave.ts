import { searchArweaveQuery } from '../../queries/search';
import type { NextApiRequest, NextApiResponse } from 'next';
import { queryAllTransactionsGQL } from 'arweavekit/graphql';

type ContentType = 'images' | 'videos' | 'pages';
interface APIRequestProps {
  text: string;
  contentType: ContentType;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { text }: APIRequestProps = req.body;

    const gateway = 'arweave-search.goldsky.com';

    const fetchImages = async () => {
      const query = searchArweaveQuery(text, 'images');
      return queryAllTransactionsGQL(query, {
        gateway,
        filters: {},
      });
    };

    const fetchVideos = async () => {
      const query = searchArweaveQuery(text, 'videos');
      return queryAllTransactionsGQL(query, {
        gateway,
        filters: {},
      });
    };

    const fetchPages = async () => {
      const query = searchArweaveQuery(text, 'pages');
      return queryAllTransactionsGQL(query, {
        gateway,
        filters: {},
      });
    };

    const [resImages, resVideos, resPages] = await Promise.all([
      fetchImages(),
      fetchVideos(),
      fetchPages(),
    ]);

    res.status(200).json({
      message: 'SUCCESSFUL',
      pages: resPages,
      videos: resVideos,
      images: resImages,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
}
