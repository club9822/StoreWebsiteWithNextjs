import React from 'react';
import styles from './layout.module.css';

interface Props{
  children?:any;
}
function Layout({ children }:Props) {
  return <div className={styles.container}>{children}</div>;
}

export default Layout;
