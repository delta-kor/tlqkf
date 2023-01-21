import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const signature = req.query.signature;
  const nonce = req.query.nonce;
  const id = req.query.id;

  const response = await axios({
    method: 'GET',
    url: 'https://whiterabbit.music-flo.com/track/' + id,
    headers: {
      'x-mcp-device-id': process.env.FLO_DEVICE_ID,
      'x-mcp-nonce': nonce,
      'x-mcp-signature': signature,
      'x-mcp-user-id': process.env.FLO_USER_ID,
    },
    validateStatus: () => true,
  });

  if (response.status < 200 || response.status >= 300) {
    res.status(500).json({ ok: false, message: '데이터를 가져올 수 없어요' });
    return;
  }

  const data = response.data;
  res.status(200).send(data);
}
