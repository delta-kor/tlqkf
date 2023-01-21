import Hls from 'hls.js';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/music.module.css';

const MusicPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const [data, setData] = useState<any>(null);

  const audioRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!id) return;
    loadData();
  }, [id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!data || !audio) return;

    const hls = new Hls();
    hls.loadSource(`/api/stream/${data.id}`);
    hls.attachMedia(audio);
  }, [data]);

  const handleBackClick = () => {
    router.back();
  };

  const loadData = async () => {
    const res = await fetch(`/api/music?id=${id}`);
    const data = await res.json();
    if (data.ok) {
      setData(data.data);
    } else {
      alert(data.message || '오류가 발생했어요');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.back} onClick={handleBackClick}>
        뒤로가기
      </div>
      {data ? (
        <div className={styles.content}>
          <img className={styles.image} src={data.image} />
          <div className={styles.title}>{data.title}</div>
          <div className={styles.artist}>{data.artist}</div>
          <audio ref={audioRef} className={styles.audio} controls></audio>
        </div>
      ) : (
        <>데이터를 불러오는 중</>
      )}
    </div>
  );
};

export default MusicPage;
