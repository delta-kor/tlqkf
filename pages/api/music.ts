// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;
  const response = await axios({
    method: 'GET',
    url: 'https://www.music-flo.com/api/meta/v1/track/' + id,
    validateStatus: () => true,
  });

  if (response.status < 200 || response.status >= 300) {
    res.status(500).json({ ok: false, message: '데이터를 가져올 수 없어요' });
    return;
  }

  const data = response.data;

  if (!data.data) {
    res.status(500).json({ ok: false, message: '데이터를 가져올 수 없어요' });
    return;
  }

  const result = {
    id: data.data.id,
    title: data.data.name,
    playTime: data.data.playTime,
    artist: data.data.representationArtist.name,
    album: data.data.album.title,
    image: data.data.album.imgList.slice(-1)[0].url,
  };

  res.status(200).json({ ok: true, data: result });
}
