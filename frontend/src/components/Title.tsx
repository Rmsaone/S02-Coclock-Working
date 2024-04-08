import React from 'react';

import styles from './Title.module.scss'

type TitleProps = {
  alignment: 'left' | 'center';
  children: React.ReactNode;
};

function Title({ alignment, children }: TitleProps) {
  const style = {
    textAlign: alignment
  };

  return <h1 className={styles.title} style={style}>{children}</h1>;
}

export default Title;
