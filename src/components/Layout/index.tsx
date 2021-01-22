import React from 'react';
import styles from './index.module.css';

interface Props{
  children?:any;
}
function Index({ children }:Props) {
  return <div className={styles.container}>{children}</div>;
}

export default Index;
