// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export type PaginationData = {
  projects: {
    name: string;
    id: number;
  }[];
  hasMore: boolean;
};

export default async (req: NextApiRequest, res: NextApiResponse<PaginationData>) => {
  const page = parseInt(req.query.page as string, 10) || 0;

  const pageSize = 10;

  const projects = Array(pageSize)
    .fill(0)
    .map((_, index) => {
      const id = page * pageSize + (index + 1);
      return {
        name: 'Project ' + id,
        id,
      };
    });

  await new Promise((r) => setTimeout(r, 1000));

  res.status(200).json({
    projects,
    hasMore: page < 9,
  });
};
