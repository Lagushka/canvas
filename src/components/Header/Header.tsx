'use client';

import React from 'react';
import styles from './Header.module.css';
import Title from 'antd/es/typography/Title';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Title level={1}>Upload Image</Title>
    </header>
  );
};
