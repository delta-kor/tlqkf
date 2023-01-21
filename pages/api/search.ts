// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query.q;
  const response = await axios({
    method: 'GET',
    url: 'https://www.music-flo.com/api/search/v2/search',
    params: {
      keyword: query,
      searchType: 'TRACK',
      sortType: 'ACCURACY',
      size: '5',
      page: '1',
    },
    validateStatus: () => true,
  });

  if (response.status < 200 || response.status >= 300) {
    res.status(500).json({ ok: false, message: '데이터를 가져올 수 없어요' });
    return;
  }

  const data = response.data;

  const list = data.data.list[0].list;
  const result = [];

  for (const item of list) {
    result.push({
      id: item.id,
      title: item.name,
      playTime: item.playTime,
      artist: item.representationArtist.name,
      album: item.album.title,
      image: item.album.imgList[2].url,
    });
  }

  res.status(200).json({ ok: true, data: result });
}
