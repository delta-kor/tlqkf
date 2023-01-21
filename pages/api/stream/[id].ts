import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  const response = await axios({
    method: 'GET',
    url: `https://www.music-flo.com/api/stream/v1/resource/${id}/web/listen/url`,
    params: { skipDislikeYn: 'Y', resourceType: 'TRACK' },
    headers: {
      'x-gm-access-token': process.env.FLO_ACCESS_TOKEN,
      'x-gm-app-name': 'FLO_WEB',
      'x-gm-device-id': process.env.FLO_DEVICE_ID,
      'x-gm-os-type': 'WEB',
    },
  });

  if (response.status < 200 || response.status >= 300) {
    res.status(500).json({ ok: false, message: '데이터를 가져올 수 없어요' });
    return;
  }

  const data = response.data;

  const url = data.data?.url;
  if (!url) {
    res.status(500).json({ ok: false, message: '데이터를 가져올 수 없어요' });
    return;
  }

  const m3u8 = await axios({
    method: 'GET',
    url,
  });

  if (m3u8.status < 200 || m3u8.status >= 300) {
    res.status(500).json({ ok: false, message: '데이터를 가져올 수 없어요' });
    return;
  }

  const m3u8BaseUrl = url.replace(/\/[^/]+$/, '');

  let m3u8Data = m3u8.data;
  m3u8Data = m3u8Data.replace(
    'https://whiterabbit.music-flo.com/track/',
    `https://delta-kor-humble-waffle-64p4rx6wp4jhrg77-3000.preview.app.github.dev/api/key/${data.data.signature}/${data.data.nonce}/`
  );
  m3u8Data = m3u8Data.replace(/sq(\d+).ts/g, m3u8BaseUrl + '/sq$1.ts');

  res
    .status(200)
    .setHeader('Content-Type', 'application/vnd.apple.mpegurl')
    .setHeader('Access-Control-Allow-Origin', '*')
    .send(m3u8Data);
}
