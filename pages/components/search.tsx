import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../../styles/components/search.module.css';

interface Props {
  initial?: string;
}

const Search: React.FC<Props> = ({ initial }) => {
  const router = useRouter();
  const [search, setSearch] = useState<string>(initial || '');

  const handleSubmit = () => {
    if (!search) return;
    router.push(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
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
  );
};

export default Search;
