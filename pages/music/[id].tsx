import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../../styles/music.module.css';

const MusicPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  useEffect(() => {
    if (!id) return;
    loadData();
  }, [id]);

  const handleBackClick = () => {
    router.back();
  };

  const loadData = async () => {
    const res = await fetch(`/api/music?id=${id}`);
    const data = await res.json();
    if (data.ok) {
      console.log(data.data);
    } else {
      alert(data.message || '오류가 발생했어요');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.back} onClick={handleBackClick}>
        뒤로가기
      </div>
    </div>
  );
};

export default MusicPage;
