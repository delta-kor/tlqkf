import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Search from './components/search';
import styles from '../styles/search.module.css';
import { useEffect, useState } from 'react';

const SearchPage: NextPage = () => {
  const router = useRouter();
  const q = router.query.q as string;

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, [q]);

  const loadData = async () => {
    const res = await fetch(`/api/search?q=${q}`);
    const data = await res.json();
    if (data.ok) {
      setData(data.data);
      console.log(data.data);
    } else {
      alert(data.message || '오류가 발생했어요');
    }
  };

  return (
    <div className={styles.wrapper}>
      <Search initial={q} />
      <div className={styles.result}>
        {data.map((item) => (
          <div className={styles.item} key={item.id}>
            <img className={styles.image} src={item.image} />
            <div className={styles.content}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.artist}>{item.artist}</div>
            </div>
            <div className={styles.right}>
              <div className={styles.playTime}>{item.playTime}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
