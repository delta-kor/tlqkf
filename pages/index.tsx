import { NextPage } from 'next';
import styles from '../styles/index.module.css';
import Search from './components/search';

const IndexPage: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Tlqkf</div>
      <Search />
    </div>
  );
};

export default IndexPage;
