import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/index.module.css';

const IndexPage: NextPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');

  const handleSubmit = () => {
    if (!search) return;
    router.push(`/search?q=${search}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Tlqkf</div>
      <div className={styles.content}>
        <input
          className={styles.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        ></input>
        <div className={styles.submit} onClick={handleSubmit}>
          검색
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
