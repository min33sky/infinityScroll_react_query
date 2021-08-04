import { NextApiRequest, NextApiResponse } from 'next';

type Body = {
  text: string;
};

const items: any[] = [];

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (req.method === 'POST') {
    const { text }: Body = req.body;

    // sometimes it will fail, this will cause a regression on the UI
    if (Math.random() > 0.7) {
      res.status(500);
      res.json({ message: 'Could not add item!' });
      return;
    }

    const newTodo = { id: Math.random().toString(), text: text.toUpperCase() };
    items.push(newTodo);
    res.json(newTodo);
    return;
  } else {
    res.json({
      ts: Date.now(),
      items,
    });
  }
};
