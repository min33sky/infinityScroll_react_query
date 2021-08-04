import { NextApiRequest, NextApiResponse } from 'next';

export interface InfinityResponse {
  data: {
    name: string;
    id: number;
  }[];
  nextId: number | null;
  previousId: number | null;
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  const cursor = parseInt(req.query.cursor as string, 10) || 0;
  const pageSize = 5;

  const data = Array(pageSize)
    .fill(0)
    .map((_, index) => {
      return {
        name: 'Project ' + (index + cursor) + ` (server time: ${Date.now()})`,
        id: index + cursor,
      };
    });
  const nextId = cursor < 10 ? data[data.length - 1].id + 1 : null;
  const previousId = cursor > -10 ? data[0].id - pageSize : null;

  return new Promise((resolve) =>
    setTimeout(() => resolve(res.json({ data, nextId, previousId })), 1000)
  );
};
