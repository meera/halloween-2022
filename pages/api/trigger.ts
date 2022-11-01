// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  trigger: boolean
}
  let currentstate = false;



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    currentstate = true;
    res.status(200).json({ trigger: currentstate });

    setTimeout(() => {
      currentstate = false;
    }, 5000);
  } else {
    res.status(200).json({ trigger: currentstate })
  }

}
