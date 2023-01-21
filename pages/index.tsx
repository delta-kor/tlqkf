import { NextPage } from 'next';
import styles from '../styles/index.module.css';

const IndexPage: NextPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Tlqkf</div>
      <input className={styles.search}></input>
    </div>
  );
};

export default IndexPage;
