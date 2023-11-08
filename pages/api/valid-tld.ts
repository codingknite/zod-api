import type { NextApiRequest, NextApiResponse } from 'next';
import { TLDs } from 'global-tld-list';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      searchText = 'g8way.io/HUc9p9Uhx_1xz_DOleApMbDz5jeq1G3kQt6Y2BQxdis',
    } = req.body;

    const isWebLink = (input: string) => {
      const urlRegex =
        /^(http|https):\/\/[^ "]+|^[\w.]+[^ "]*\.[A-Za-z]{2,3}(\/.*)?$/;
      return urlRegex.test(input);
    };

    const extractTLD = (link: string) => {
      const withoutProtocol = link.replace(/^https?:\/\//, '');
      const parts = withoutProtocol.split('/');
      const domain = parts[0].replace(/^(www\.)?/, '');
      const domainParts = domain.split('.');
      const tld = domainParts[domainParts.length - 1];
      return tld;
    };

    const addHttpsPrefix = (input: string) => {
      if (!input.match(/^(http|https):\/\//)) {
        return 'https://' + input;
      }
      return input;
    };

    const isLink = isWebLink(searchText);

    if (isLink) {
      const tld = extractTLD(searchText);
      const validTld = TLDs.isValid(tld);

      if (validTld) {
        // prefix with http
        const link = addHttpsPrefix(searchText);

        // return response
        res.status(200).json({
          message: 'SUCCESSFUL',
          validLink: true,
          link,
        });
      } else {
        res.status(200).json({
          message: 'SUCCESSFUL',
          validLink: false,
        });
      }
    } else {
      res.status(200).json({
        message: 'SUCCESSFUL',
        validLink: false,
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}
